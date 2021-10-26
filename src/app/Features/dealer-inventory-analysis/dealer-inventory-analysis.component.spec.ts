import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerInventoryAnalysisComponent } from './dealer-inventory-analysis.component';

describe('DealerInventoryAnalysisComponent', () => {
  let component: DealerInventoryAnalysisComponent;
  let fixture: ComponentFixture<DealerInventoryAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerInventoryAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerInventoryAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
