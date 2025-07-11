import { AfterViewInit, Component, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-starbackground',
  template: '<div #vantaBg class="vanta-container"></div>'
})
export class StarbackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('vantaBg') vantaBg!: ElementRef;
  vantaEffect: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) { // ← MOST IMPORTANT LINE
      this.initVanta();
    }
  }

  async initVanta() {
    // 1. Set THREE globally
    (window as any).THREE = THREE;
    
    // 2. Dynamic import
    const DOTS = (await import('vanta/dist/vanta.net.min')).default;
    
    // 3. Initialize with explicit THREE reference
    this.vantaEffect = DOTS({
      el: this.vantaBg.nativeElement,
      THREE: THREE, // ← MUST PASS EXPLICITLY
      mouseControls: true,
      touchControls: true,
      backgroundColor: 0x000000
    });
  }

  ngOnDestroy() {
    this.vantaEffect?.destroy();
  }
}