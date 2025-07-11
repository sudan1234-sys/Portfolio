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
  resizeObserver!: ResizeObserver;

  ngAfterViewInit() {
    this.initVanta();
  }

  async initVanta() {
    // Ensure THREE is globally available
    if (typeof window !== 'undefined') {
      (window as any).THREE = THREE;
    }

    // Load Vanta dynamically
    const DOTS = (await import('vanta/dist/vanta.net.min')).default;

    this.vantaEffect = DOTS({
      el: this.vantaBg.nativeElement,
      THREE: THREE, // Pass THREE directly
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

    // Add resize handler
    this.resizeObserver = new ResizeObserver(() => {
      if (this.vantaEffect) {
        this.vantaEffect.resize();
        this.vantaEffect.renderer.setSize(
          this.vantaBg.nativeElement.offsetWidth,
          this.vantaBg.nativeElement.offsetHeight
        );
      }
    });
    this.resizeObserver.observe(this.vantaBg.nativeElement);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }
}