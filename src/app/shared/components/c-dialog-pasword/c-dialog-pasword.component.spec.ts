import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDialogPaswordComponent } from './c-dialog-pasword.component';

describe('CDialogPaswordComponent', () => {
  let component: CDialogPaswordComponent;
  let fixture: ComponentFixture<CDialogPaswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CDialogPaswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CDialogPaswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
