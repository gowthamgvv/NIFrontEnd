import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PswrdPopupComponent } from './pswrd-popup.component';

describe('PswrdPopupComponent', () => {
  let component: PswrdPopupComponent;
  let fixture: ComponentFixture<PswrdPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PswrdPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PswrdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
