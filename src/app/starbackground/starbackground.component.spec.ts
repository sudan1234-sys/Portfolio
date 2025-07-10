import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarbackgroundComponent } from './starbackground.component';

describe('StarbackgroundComponent', () => {
  let component: StarbackgroundComponent;
  let fixture: ComponentFixture<StarbackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarbackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarbackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
