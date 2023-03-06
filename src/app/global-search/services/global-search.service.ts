import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {AuthResponseInterface} from "../../auth/interfaces/auth-response.interface";
import {GlobalSearchQuery} from "../graph-queries/global-search";
import {BehaviorSubject, map, Observable, share} from "rxjs";
import {SearchedItemsInterface} from "../interfaces/searched-items.interface";

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {
  readonly #searchAllSameItemsQuery = GlobalSearchQuery.searchAllSameItems;

  #searchedItems$ = new BehaviorSubject<SearchedItemsInterface[]>([]);
  searchedItems$ = this.#searchedItems$.asObservable();

  constructor(private apollo: Apollo) {
  }

  searchAllSameItems(searchValue: string | null) {
    if (searchValue === null || searchValue.length === 0) {
      this.#searchedItems$.next([])
      return
    }
    return this.apollo.query<{ searchAllSameItems: SearchedItemsInterface[] }>({
      query: this.#searchAllSameItemsQuery,
      variables: {searchValue}
    }).pipe(
      share(),
      map(res => res.data.searchAllSameItems)
    ).subscribe(res => {
      this.#searchedItems$.next(res)
    })
  }
}
