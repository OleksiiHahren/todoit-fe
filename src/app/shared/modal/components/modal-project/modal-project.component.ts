import {
  Component,
  EventEmitter, Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ProjectInterface
} from '../../../../core/interfaces/create-project.interface';
import {
  SelectListColorsConfig
} from '../../../../core/enums/select-list-colors.enum';

@Component({
  selector: 'app-modal-project',
  templateUrl: './modal-project.component.html',
  styleUrls: ['./modal-project.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalProjectComponent implements OnInit {
  readonly selectListColorsConfig: {[index: string]:any} = SelectListColorsConfig;

  formGroup!: FormGroup;
  @Output() sendEvent = new EventEmitter<ProjectInterface | null>();
  @Input() project!: ProjectInterface;
  constructor() { }

  ngOnInit(): void {
    this.#initForm();
  }

  close(): void {
    this.sendEvent.emit(null);
  }

  saveData(): void {
    this.sendEvent.emit(this.formGroup.value);
  }

  getColorValues(): {color: string, name: string, id: string}[] {
    return Object.values(this.selectListColorsConfig);
  }


  setCorrectColorKey(i: number): void {
    const targetKey = Object.keys(SelectListColorsConfig)[i];
    this.formGroup.get('color')?.patchValue(targetKey);
  }

  #initForm(): void {
    console.log(this.project)
    this.formGroup = new FormGroup({
      id: new FormControl(this.project?.id || null),
      color: new FormControl(this.project?.color || null, [Validators.required]),
      name: new FormControl(this.project?.name || null, [Validators.required]),
      favorite: new FormControl(this.project?.favorite|| false,),
    });
  }

}
