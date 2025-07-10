import { AfterViewInit, Component, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-starbackground',
  template: '<div #vantaBg class="vanta-container"></div>',
  styleUrls: ['./starbackground.component.scss']
})
export class StarbackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('vantaBg', { static: true }) vantaBg!: ElementRef;
  vantaEffect: any;

  async ngAfterViewInit() {
    await this.initVanta();
  }

  async initVanta() {
    // Set THREE to global scope first
    (window as any).THREE = THREE;

    // Dynamically import Vanta after setting global THREE
    const DOTS = (await import('vanta/dist/vanta.net.min')).default;

    this.vantaEffect = DOTS({
      el: this.vantaBg.nativeElement,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color: 0xffffff,
      backgroundColor: 0x000000,
      backgroundAlpha: 1.0,
      spacing: 20
    });

    if (this.vantaEffect?.renderer) {
      this.vantaEffect.renderer.setClearColor(0x000000, 1);
    }
  }

  ngOnDestroy() {
    this.vantaEffect?.destroy();
  }
}