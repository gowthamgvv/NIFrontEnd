import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldUnitsDataComponent } from './sold-units-data.component';

describe('SoldUnitsDataComponent', () => {
  let component: SoldUnitsDataComponent;
  let fixture: ComponentFixture<SoldUnitsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldUnitsDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldUnitsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
