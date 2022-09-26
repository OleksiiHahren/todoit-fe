import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalWrapperComponent
} from './components/modal-wrapper/modal-wrapper.component';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ModalProjectComponent
} from './components/modal-project/modal-project.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ModalTaskComponent } from './components/modal-task/modal-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    ModalWrapperComponent,
    ModalProjectComponent,
    ModalTaskComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [ModalWrapperComponent]
})
export class ModalModule {}
