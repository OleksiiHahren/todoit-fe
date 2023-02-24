import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearchInputComponent } from './global-search-input.component';

describe('GlobalSearchInputComponent', () => {
  let component: GlobalSearchInputComponent;
  let fixture: ComponentFixture<GlobalSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalSearchInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
