import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDialogMassiveUpdateComponent } from './c-dialog-massive-update.component';

describe('CDialogMassiveUpdateComponent', () => {
  let component: CDialogMassiveUpdateComponent;
  let fixture: ComponentFixture<CDialogMassiveUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CDialogMassiveUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CDialogMassiveUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
