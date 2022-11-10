import { Injectable } from '@angular/core';
import { BehaviorSubject, map, share } from 'rxjs';
import { ProjectItemInterface } from '../interfaces/project-item.interface';
import { Apollo } from 'apollo-angular';
import { ProjectQueries } from './graph-queries/project-queries';
import { PagingInterface } from '../../core/interfaces/paging.interface';
import {
  ProjectInterface
} from '../../core/interfaces/create-project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly projectQueries = ProjectQueries;

  #favoriteProjects$ = new BehaviorSubject<ProjectItemInterface[]>([]);
  favoriteProjects$ = this.#favoriteProjects$.asObservable();

  #allProjects$ = new BehaviorSubject<ProjectItemInterface[]>([]);
  allProjects$ = this.#allProjects$.asObservable();

  constructor(private apollo: Apollo) { }

  createProject(project: ProjectItemInterface) {
    return this.apollo.mutate<{createOneProject: ProjectItemInterface}>({
      mutation: this.projectQueries.createOneProject,
      variables: {input: {project}}
    }).pipe(
      share(),
      map(res => {
        return res.data?.createOneProject;
      })
    ).subscribe(res => {
        if (res && res?.favorite) {
          const projects = this.#favoriteProjects$.value;
          this.#favoriteProjects$.next([res, ...projects]);
        } else if (res) {
          const projects = this.#allProjects$.value;
          this.#allProjects$.next([res, ...projects]);
        }
      }
    );

  }

  getFavoriteProjects(paging: PagingInterface) {
    return this.apollo.query<{getFavoriteProjects: ProjectItemInterface[]}>({
      query: this.projectQueries.getFavoriteProjects,
      variables: {paging}
    }).pipe(
      share(),
      map(res => {
        return res.data?.getFavoriteProjects;
      })
    ).subscribe(
      res => {
        if (res) {
          this.#favoriteProjects$.next(res);
        }
      }
    );
  }

  getOwnProjects(paging: PagingInterface) {
    return this.apollo.query<{getOwnProjects: ProjectItemInterface[]}>({
      query: this.projectQueries.getOwnProjects,
      variables: {paging}
    }).pipe(
      share(),
      map(res => res.data?.getOwnProjects)
    ).subscribe(
      res => {
        if (res) {
          this.#allProjects$.next(res);
        }
      }
    );
  }

  updateProject(data: ProjectInterface) {
    const {id, ...project} = data;
    return this.apollo.mutate<{updateOneProject: ProjectItemInterface}>({
      mutation: this.projectQueries.updateOneProject,
      variables: {
        input: {
          id,
          update: {
            ...project
          }
        }
      }
    }).pipe(
      share(),
      map(res => {
        return res.data?.updateOneProject;
      })
    ).subscribe(() => {
    });
  }

  deleteProject(id: string) {
    return this.apollo.mutate<{deleteOneProject: ProjectItemInterface}>({
      mutation: this.projectQueries.deleteOneProject,
      variables: {input: {id}}
    }).pipe(
      share(),
      map(res => {
        return res.data?.deleteOneProject;
      })
    ).subscribe(res => {
      if (res && res?.favorite) {
        const projects = this.#favoriteProjects$.value.filter(el => el.id !== res.id);
        this.#favoriteProjects$.next([...projects]);
      } else if (res) {
        const projects = this.#allProjects$.value.filter(el => el.id !== res.id);
        this.#allProjects$.next([...projects]);
      }
    });
  }
}
