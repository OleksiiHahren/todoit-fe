import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import {
  ProjectInterface
} from '../../../core/interfaces/create-project.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  targetProject!: ProjectInterface;
  targetProjectSubscription!: Subscription;

  constructor(private projectService: ProjectService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const {projectId} = this.activatedRoute.snapshot.params;
    this.targetProjectSubscription =
      this.projectService.getProjectWithDetails(projectId).subscribe(
        res => this.targetProject = res.project
      );
  }

  ngOnDestroy(): void {
    this.targetProjectSubscription.unsubscribe();
  }

}
