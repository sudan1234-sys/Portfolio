import { AfterViewInit, Component, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

@Component({
  selector: 'app-starbackground',
  template: '<div #vantaBg class="vanta-container"></div>',
  styleUrls: ['./starbackground.component.scss']
})
export class StarbackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('vantaBg', { static: true }) vantaBg!: ElementRef;
  vantaEffect: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initVanta();
    }
  }

  initVanta() {
    try {
     this.vantaEffect = NET({
  el: this.vantaBg.nativeElement,
  THREE,
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 1,
  scaleMobile: 1,
  color: 0xff69b4,          // 🎨 Hot pink
  backgroundColor: 0x000000, // Black background
  points: 10,                // Density of points
  maxDistance: 20,           // How long the lines are
  spacing: 18
});

    } catch (error) {
      console.error('VANTA initialization error:', error);
    }
  }

  ngOnDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }
}
