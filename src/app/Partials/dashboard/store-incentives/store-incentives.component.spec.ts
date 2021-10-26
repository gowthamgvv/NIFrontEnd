import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreIncentivesComponent } from './store-incentives.component';

describe('StoreIncentivesComponent', () => {
  let component: StoreIncentivesComponent;
  let fixture: ComponentFixture<StoreIncentivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreIncentivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreIncentivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
