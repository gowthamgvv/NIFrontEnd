import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomndInventoryComponent } from './recomnd-inventory.component';

describe('RecomndInventoryComponent', () => {
  let component: RecomndInventoryComponent;
  let fixture: ComponentFixture<RecomndInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomndInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomndInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
