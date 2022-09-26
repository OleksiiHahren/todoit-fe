import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ProjectInterface
} from '../../../../core/interfaces/create-project.interface';

@Component({
  selector: 'app-modal-project',
  templateUrl: './modal-project.component.html',
  styleUrls: ['./modal-project.component.scss']
})
export class ModalProjectComponent implements OnInit {
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
      color: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      favorite: new FormControl(false,),
    });
  }

}
