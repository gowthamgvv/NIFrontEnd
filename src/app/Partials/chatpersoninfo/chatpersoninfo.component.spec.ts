import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatpersoninfoComponent } from './chatpersoninfo.component';

describe('ChatpersoninfoComponent', () => {
  let component: ChatpersoninfoComponent;
  let fixture: ComponentFixture<ChatpersoninfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatpersoninfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatpersoninfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
