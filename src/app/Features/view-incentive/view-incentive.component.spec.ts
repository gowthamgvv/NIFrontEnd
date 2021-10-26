import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIncentiveComponent } from './view-incentive.component';

describe('ViewIncentiveComponent', () => {
  let component: ViewIncentiveComponent;
  let fixture: ComponentFixture<ViewIncentiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIncentiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIncentiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
