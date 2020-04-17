import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionHomeComponent } from './session-home.component';

describe('SessionHomeComponent', () => {
  let component: SessionHomeComponent;
  let fixture: ComponentFixture<SessionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
