import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapenhComponent } from './capenh.component';

describe('CapenhComponent', () => {
  let component: CapenhComponent;
  let fixture: ComponentFixture<CapenhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapenhComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
