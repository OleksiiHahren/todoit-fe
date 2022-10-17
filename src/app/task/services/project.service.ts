import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, share } from 'rxjs';
import { ProjectItemInterface } from '../interfaces/project-item.interface';
import { Apollo } from 'apollo-angular';
import { ProjectQueries } from './graph-queries/project-queries';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly projectQueries = ProjectQueries;

  #favoriteProjects$ = new BehaviorSubject<ProjectItemInterface[]>([]);
  favoriteProjects$= this.#favoriteProjects$.asObservable();

  #allProjects$ = new BehaviorSubject<ProjectItemInterface[]>([]);
  allProjects$= this.#allProjects$.asObservable();

  constructor(private apollo: Apollo) { }

  createProject(data: ProjectItemInterface) {
    return this.apollo.mutate<ProjectItemInterface>({
      mutation: this.projectQueries.createOneProject,
      variables: {data}
    }).pipe(
      share(),
      map(res => res.data)
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

  getFavoriteProjects() {
    return this.apollo.query<{getFavoriteProjects: ProjectItemInterface[]}>({
      query: this.projectQueries.getFavoriteProjects,
    }).pipe(
      map(res => res.data)
    ).subscribe(
      res => {
        const {getFavoriteProjects} = res;
        if (res && getFavoriteProjects) {
          this.#favoriteProjects$.next(getFavoriteProjects);
        }
      }
    );
  }

  getOwnProjects() {
    return this.apollo.query<{getOwnProjects: ProjectItemInterface[]}>({
      query: this.projectQueries.getOwnProjects,
    }).pipe(
      map(res => res.data)
    ).subscribe(
      res => {
        const {getOwnProjects} = res;
        if (res && getOwnProjects) {
          this.#allProjects$.next(getOwnProjects);
        }
      }
    );
  }
}
