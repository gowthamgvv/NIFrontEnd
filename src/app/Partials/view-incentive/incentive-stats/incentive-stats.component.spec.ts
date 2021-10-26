import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncentiveStatsComponent } from './incentive-stats.component';

describe('IncentiveStatsComponent', () => {
  let component: IncentiveStatsComponent;
  let fixture: ComponentFixture<IncentiveStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncentiveStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncentiveStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
