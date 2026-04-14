import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDialogUploadFileComponent } from './c-dialog-upload-file.component';

describe('CDialogUploadFileComponent', () => {
  let component: CDialogUploadFileComponent;
  let fixture: ComponentFixture<CDialogUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CDialogUploadFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CDialogUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
