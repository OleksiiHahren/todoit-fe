import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ModalWrapperComponent
} from '../../../shared/modal/components/modal-wrapper/modal-wrapper.component';
import { ModalTypesEnum } from '../../../core/enums/modal-types.enum';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})



export class SideNavComponent implements OnInit {
  panelOpenState = false;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  createProject(event: Event){
    event.stopPropagation();
    this.dialog.open(ModalWrapperComponent, {
      data: {
        payload: null,
        type: ModalTypesEnum.Project
      }
    })
  }
}
