import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerIncentivesComponent } from './consumer-incentives.component';

describe('ConsumerIncentivesComponent', () => {
  let component: ConsumerIncentivesComponent;
  let fixture: ComponentFixture<ConsumerIncentivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerIncentivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerIncentivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
