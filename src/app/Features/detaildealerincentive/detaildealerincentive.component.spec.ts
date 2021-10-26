import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildealerincentiveComponent } from './detaildealerincentive.component';

describe('DetaildealerincentiveComponent', () => {
  let component: DetaildealerincentiveComponent;
  let fixture: ComponentFixture<DetaildealerincentiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaildealerincentiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaildealerincentiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
