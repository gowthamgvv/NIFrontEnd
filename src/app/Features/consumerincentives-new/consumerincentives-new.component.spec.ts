import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerincentivesNewComponent } from './consumerincentives-new.component';

describe('ConsumerincentivesNewComponent', () => {
  let component: ConsumerincentivesNewComponent;
  let fixture: ComponentFixture<ConsumerincentivesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerincentivesNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerincentivesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
