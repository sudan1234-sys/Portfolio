import { AfterViewInit, Component, OnDestroy, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-starbackground',
  template: '<div #vantaBg class="vanta-container"></div>',
  styleUrls: ['./starbackground.component.scss']
})
export class StarbackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('vantaBg', { static: true }) vantaBg!: ElementRef;
  vantaEffect: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      await this.initVanta();
    }
  }

  async initVanta() {
    try {
      // 1️⃣ Dynamically load THREE and attach to window (Vanta requires this)
      const THREE = await import('three');
      (window as any).THREE = THREE;

      // 2️⃣ Import Vanta module
      const VANTA = await import('vanta/dist/vanta.net.min');

      // 3️⃣ Compatibility fix: handle .default export vs. direct export
      const NET = VANTA.default || VANTA;

      // 4️⃣ Initialize
      this.vantaEffect = NET({
        el: this.vantaBg.nativeElement,
        THREE: THREE,             // Always pass THREE explicitly
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0xffffff,
        backgroundColor: 0x000000
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
