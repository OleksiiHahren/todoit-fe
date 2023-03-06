import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, Observable, Subscription} from "rxjs";
import {GlobalSearchService} from "../../services/global-search.service";
import {SearchedItemsInterface} from "../../interfaces/searched-items.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-global-search-input',
  templateUrl: './global-search-input.component.html',
  styleUrls: ['./global-search-input.component.scss']
})
export class GlobalSearchInputComponent implements OnInit, OnDestroy {
  globalSearchInput = new FormControl(null);
  searchedItems$ = this.globalSearchService.searchedItems$;
  searchSubscription!: Subscription;

  constructor(private globalSearchService: GlobalSearchService, private router: Router) {
  }

  ngOnInit(): void {
    this.globalSearchInput.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(
      res =>
        this.globalSearchService.searchAllSameItems(res)
    )
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  clearSearch(): void {
    this.globalSearchInput.patchValue(null)
  }

  navigateTo(option: SearchedItemsInterface): void {
    if(option.type === 'task'){
      this.router.navigate(['workspace/task-list/income'])
    }
    if(option.type ==='project') {
      this.router.navigate([`workspace/project/${option.id}`])
    }
  }
}
