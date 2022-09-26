import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskForTodayComponent } from './task-for-today.component';

describe('TaskForTodayComponent', () => {
  let component: TaskForTodayComponent;
  let fixture: ComponentFixture<TaskForTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskForTodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskForTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
