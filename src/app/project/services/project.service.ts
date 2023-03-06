import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, share } from 'rxjs';
import { ProjectItemInterface } from '../interfaces/project-item.interface';
import { Apollo } from 'apollo-angular';

import { PagingInterface } from '../../core/interfaces/paging.interface';
import {
  ProjectInterface
} from '../../core/interfaces/create-project.interface';
import {ProjectQueries} from "../graph-queries/project-queries";

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
          this.#allProjects$.next([res, ...projects]);
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
        console.log(res, 'here the res for my projects');
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
      map(res => {
        return res.data?.updateOneProject;
      }),
      share(),
    ).subscribe((res) => {
      if(res?.favorite){
        const values = [...this.#favoriteProjects$.value];
        const targetInd = values.findIndex(el=> el.id === res.id);
        values[targetInd] = res;
        this.#favoriteProjects$.next([]);
        this.#favoriteProjects$.next(values)
      } else if(res && !res?.favorite){
        const values = [...this.#allProjects$.value];
        const targetInd = values.findIndex(el=> el.id === res.id);
        values[targetInd] = res;
        this.#allProjects$.next([...values])
      }
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

  getProjectWithDetails(id: string): Observable<{project: ProjectInterface}> {
    return this.apollo.query<{project: ProjectInterface}>({
      query: this.projectQueries.getProjectWithDetails,
      variables: {id}
    }).pipe(
      share(),
      map(res => res.data)
    );
  }
}
