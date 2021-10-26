import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatgroupinfoComponent } from './chatgroupinfo.component';

describe('ChatgroupinfoComponent', () => {
  let component: ChatgroupinfoComponent;
  let fixture: ComponentFixture<ChatgroupinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatgroupinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatgroupinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
