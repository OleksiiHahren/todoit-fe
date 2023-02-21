import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkModalComponent } from './components/mark-modal/mark-modal.component';
import { MarkItemComponent } from './components/mark-item/mark-item.component';
import { MarkItemListComponent } from './components/mark-item-list/mark-item-list.component';



@NgModule({
  declarations: [
    MarkModalComponent,
    MarkItemComponent,
    MarkItemListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MarkModule { }
