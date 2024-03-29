import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ModalWrapperComponent
} from '../../../shared/modal/components/modal-wrapper/modal-wrapper.component';
import { ModalTypesEnum } from '../../../core/enums/modal-types.enum';
import {
  ProjectItemInterface
} from '../../../project/interfaces/project-item.interface';
import {
  SelectListColorsConfig
} from '../../../core/enums/select-list-colors.enum';
import {
  ProjectInterface
} from '../../../core/interfaces/create-project.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})


export class SideNavComponent implements OnInit, OnChanges {
  readonly colors: {[index: string]: any} = SelectListColorsConfig;

  panelOpenState = false;

  @Output() createProject = new EventEmitter<void>();
  @Output() deleteProject = new EventEmitter<string>();
  @Output() updateProject = new EventEmitter<ProjectInterface>();

  @Input() favoriteProjects!: ProjectItemInterface[] | null;
  @Input() allProjects!: ProjectItemInterface[] | null;

  constructor(public dialog: MatDialog, private router: Router, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.cd.detectChanges()
  }

  navigateToProject(projectId: string | null) {
    if (projectId) {
      this.router.navigate([`workspace/project/${projectId}`]);
    }
  }
}
