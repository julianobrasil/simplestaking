import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Store, select} from '@ngrx/store';

import {Operation, FilterData} from '../../../../data-access/models';

import * as fromStatsStore from '../../../../data-access/store/tz-stats';
import * as fromRootStore from '../../../../data-access/store/root';

@Injectable({providedIn: 'root'})
export class StatsTableContainerComponentFacade {
  constructor(private _store: Store<{}>) {}

  /** Get the current user from the store (useful if you navigate away and back to the stats table) */
  getFilteredUser$(): Observable<string> {
    return this._store.pipe(
      select(fromStatsStore.getFilter),
      map(
        (filter: FilterData) =>
          filter.userAddress || filter.receiverAddress || filter.senderAddress || '',
      ),
    );
  }

  /** Getting all the transacions in the set page, from the store */
  getTransactions$(): Observable<Operation[]> {
    return this._store.pipe(select(fromStatsStore.getCurrentPageTransactions));
  }

  /** Update the search filter, reseting all the store */
  updateSearchFilter(userAddress: string): void {
    this.loadMostRecentCycle();
    this._store.dispatch(
      fromStatsStore.updateTzStatsFilterDataRequest({filter: {userAddress}}),
    );
  }

  /** Reset pagination (ask for the most recent data) */
  resetPagination(): void {
    this.loadMostRecentCycle();
    this._store.dispatch(fromStatsStore.resetPageDataRequest());
  }

  /** Get the exchange rate from the store */
  getExchangeRateByCurrency$(currency: string): Observable<number> {
    return this._store.pipe(
      select(fromRootStore.getExchangeRateByCurrency, {currency}),
    );
  }

  /** Get the most recent cycle so we can calculate pending status */
  getMostRecentCycle$(): Observable<number> {
    return this._store.pipe(select(fromStatsStore.getMostRecentCycleNumber));
  }

  /** Get the status of the data retrieve from the API */
  getDataLoading$(): Observable<boolean> {
    return this._store.pipe(select(fromStatsStore.getDataLoading));
  }

  /** Go to the database end bring the most recentCycleRequest */
  loadMostRecentCycle(): void {
    this._store.dispatch(fromStatsStore.mostRecentCycleRequest());
  }

  updatePagedData(oldestData: boolean): void {
    this._store.dispatch(
      fromStatsStore.updatePageDataRequest({oldestData}),
    );
  }
}
