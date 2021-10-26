import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerincentivesComponent } from './dealerincentives.component';

describe('DealerincentivesComponent', () => {
  let component: DealerincentivesComponent;
  let fixture: ComponentFixture<DealerincentivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerincentivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerincentivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
