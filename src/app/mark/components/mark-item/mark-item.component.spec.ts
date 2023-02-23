import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkItemComponent } from './mark-item.component';

describe('MarkItemComponent', () => {
  let component: MarkItemComponent;
  let fixture: ComponentFixture<MarkItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
