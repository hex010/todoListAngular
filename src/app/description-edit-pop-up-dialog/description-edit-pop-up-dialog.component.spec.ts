import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionEditPopUpDialogComponent } from './description-edit-pop-up-dialog.component';

describe('DescriptionEditPopUpDialogComponent', () => {
  let component: DescriptionEditPopUpDialogComponent;
  let fixture: ComponentFixture<DescriptionEditPopUpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionEditPopUpDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionEditPopUpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
