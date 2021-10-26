import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersetupComponent } from './dealersetup.component';

describe('DealersetupComponent', () => {
  let component: DealersetupComponent;
  let fixture: ComponentFixture<DealersetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealersetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
