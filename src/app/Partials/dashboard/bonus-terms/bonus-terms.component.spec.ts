import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusTermsComponent } from './bonus-terms.component';

describe('BonusTermsComponent', () => {
  let component: BonusTermsComponent;
  let fixture: ComponentFixture<BonusTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonusTermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
