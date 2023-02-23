import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkItemListComponent } from './mark-item-list.component';

describe('MarkItemListComponent', () => {
  let component: MarkItemListComponent;
  let fixture: ComponentFixture<MarkItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
