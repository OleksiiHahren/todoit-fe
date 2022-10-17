import {
  Component,
  EventEmitter,
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

  #initForm(val?: any): void {
    this.formGroup = new FormGroup({
      color: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      favorite: new FormControl(false,),
    });
  }

}
