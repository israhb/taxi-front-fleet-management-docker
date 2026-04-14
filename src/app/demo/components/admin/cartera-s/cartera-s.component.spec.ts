import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteraSComponent } from './cartera-s.component';

describe('CarteraSComponent', () => {
  let component: CarteraSComponent;
  let fixture: ComponentFixture<CarteraSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteraSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarteraSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
