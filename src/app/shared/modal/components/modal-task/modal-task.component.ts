import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ProjectInterface
} from '../../../../core/interfaces/create-project.interface';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss']
})
export class ModalTaskComponent implements OnInit {
  formGroup!: FormGroup;

  @Output() sendEvent = new EventEmitter<ProjectInterface| null>();

  constructor() { }

  ngOnInit(): void {
    this.#initForm();
  }

  close(): void {
    this.sendEvent.emit(null)
  }

  saveData(): void {
    this.sendEvent.emit(this.formGroup.value)
  }

  #initForm(val?: any): void {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      deadline: new FormControl(),
      description: new FormControl(),
    });
  }

}
