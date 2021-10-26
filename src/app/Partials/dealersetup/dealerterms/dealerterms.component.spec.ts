import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealertermsComponent } from './dealerterms.component';

describe('DealertermsComponent', () => {
  let component: DealertermsComponent;
  let fixture: ComponentFixture<DealertermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealertermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealertermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
