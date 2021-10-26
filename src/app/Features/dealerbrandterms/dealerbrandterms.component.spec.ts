import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerbrandtermsComponent } from './dealerbrandterms.component';

describe('DealerbrandtermsComponent', () => {
  let component: DealerbrandtermsComponent;
  let fixture: ComponentFixture<DealerbrandtermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerbrandtermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerbrandtermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
