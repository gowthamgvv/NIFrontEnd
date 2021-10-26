import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerStoresComponent } from './dealer-stores.component';

describe('DealerStoresComponent', () => {
  let component: DealerStoresComponent;
  let fixture: ComponentFixture<DealerStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerStoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
