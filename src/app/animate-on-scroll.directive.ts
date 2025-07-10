import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

// Animation definitions
const ANIMATIONS = {
  up: trigger('scrollUp', [
    state('hidden', style({ opacity: 0, transform: 'translateY(200px)' })),
    state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
    transition('hidden => visible', animate('2000ms ease-out'))
  ]),
  left: trigger('scrollLeft', [
    state('hidden', style({ opacity: 0, transform: 'translateX(-500px)' })),
    state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('hidden => visible', animate('2000ms ease-out'))
  ]),
  right: trigger('scrollRight', [
    state('hidden', style({ opacity: 0, transform: 'translateX(200px)' })),
    state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('hidden => visible', animate('2000ms ease-out'))
  ])
};

@Directive({
  standalone: true,
  selector: '[appAnimate]',
  host: {
    '[@scrollUp]': 'upState',
    '[@scrollLeft]': 'leftState',
    '[@scrollRight]': 'rightState',
    '[@.disabled]': 'false'
  }
})
export class AnimateOnScrollDirective implements AfterViewInit {
  @Input() animationType: 'up' | 'left' | 'right' = 'up';
  upState: 'hidden' | 'visible' = 'hidden';
  leftState: 'hidden' | 'visible' = 'hidden';
  rightState: 'hidden' | 'visible' = 'hidden';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.triggerAnimation();
            observer.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(this.el.nativeElement);
  }

  private triggerAnimation() {
    switch(this.animationType) {
      case 'up': this.upState = 'visible'; break;
      case 'left': this.leftState = 'visible'; break;
      case 'right': this.rightState = 'visible'; break;
    }
  }
}

// Export animations for component registration
export const SCROLL_ANIMATIONS = [
  ANIMATIONS.up,
  ANIMATIONS.left,
  ANIMATIONS.right
];