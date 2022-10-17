import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUpcomingComponent } from './task-upcoming.component';

describe('TaskUpcomingComponent', () => {
  let component: TaskUpcomingComponent;
  let fixture: ComponentFixture<TaskUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskUpcomingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
