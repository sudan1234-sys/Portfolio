import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appHover]',
  standalone: true
})
export class HoverDirective {
  @Output() appHover = new EventEmitter<boolean>();

  @HostListener('mouseenter')
  onMouseEnter() {
    this.appHover.emit(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.appHover.emit(false);
  }
}
