import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalTypesEnum } from 'src/app/core/enums/modal-types.enum';
import {
  ProjectInterface
} from '../../../../core/interfaces/create-project.interface';
import {
  TaskItemInterface
} from '../../../../task/interfaces/task-item.interface';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnInit {
  readonly modalTypesEnum = ModalTypesEnum;
  constructor(public dialogRef: MatDialogRef<ModalWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
    payload: any;
    type: ModalTypesEnum;
    },
  ) {}

  ngOnInit(): void {
  }

  onDelegation(data: ProjectInterface | TaskItemInterface | null):void {
    this.dialogRef.close(data)
  }

}
