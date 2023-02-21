import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  ProjectInterface
} from '../../../../core/interfaces/create-project.interface';
import {PrioritiesEnum} from "../../../../core/enums/priorities.enum";
import {F} from "@angular/cdk/keycodes";
import {TaskItemInterface} from "../../../../task/interfaces/task-item.interface";

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss']
})
export class ModalTaskComponent implements OnInit {
  readonly priorities = Object.keys(PrioritiesEnum);
  formGroup!: FormGroup;
  @Input() projects!: ProjectInterface[];
  @Output() sendEvent = new EventEmitter<ProjectInterface | null>();

  constructor() {
  }

  ngOnInit(): void {
    this.#initForm();
  }

  close(): void {
    this.sendEvent.emit(null)
  }

  saveData(): void {
    this.sendEvent.emit(this.formGroup.value)
  }

  #initForm(val?: TaskItemInterface): void {
    this.formGroup = new FormGroup({
      name: new FormControl(val?.name|| null, [Validators.required]),
      deadline: new FormControl(val?.deadline || null),
      description: new FormControl(val?.deadline || null),
      projectId: new FormControl(val?.deadline || null),
      priority: new FormControl(val?.priority || null),
      markIds: new FormControl(val?.marks?.map(el=> el.id) || null)
    });
  }

}
