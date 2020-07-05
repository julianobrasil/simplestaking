import {Injectable} from '@angular/core';

import {Store, select} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {switchMap, map, take} from 'rxjs/operators';
import {combineLatest} from 'rxjs';

import {Operation, PaginationData} from '../../models';
import {TzStatsApi} from '../../api/tz-stats.api';

import * as fromActions from './tz-stats-table.actions';
import * as fromSelectors from './tz-stats-table.selectors';
import * as fromUtils from './tz-stats-table-effects.utils';

@Injectable()
export class TzStatsTableEffects {
  constructor(
    private _store$: Store<{}>,
    private _actions$: Actions,
    private _tzStatApi: TzStatsApi,
  ) {}

  _updatePaginationData$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(fromActions.updatePageDataRequest),
      switchMap(({oldestData}) =>
        combineLatest([
          this._store$.pipe(select(fromSelectors.getPagination)),
          this._store$.pipe(select(fromSelectors.getFilter)),
        ]).pipe(
          map(([pagination, filter]) => ({oldestData, pagination, filter})),
          take(1),
        ),
      ),
      switchMap(({oldestData, filter, pagination}) =>
        fromUtils.retrieveDataFromTheApi(
          {oldestData, filter, pagination},
          this._tzStatApi,
        ),
      ),
      map(({transactions}) =>
        fromActions.updatePageDataSuccess({transactions}),
      ),
    );
  });

  _updateFilterData$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(fromActions.updateTzStatsFilterDataRequest),
      switchMap(({filter}) =>
        this._store$.pipe(
          select(fromSelectors.getPagination),
          map((pagination: PaginationData) => ({pagination, filter})),
          take(1),
        ),
      ),
      switchMap(({filter, pagination}) => {
        const nextPage = true;
        const startItemPagination = {
          firstRowIdInPage: null,
          lastRowIdInPage: null,
          firstRowIdInStore: null,
          lastRowIdInStore: null,
          limit: 20,
        };
        return fromUtils
          .retrieveDataFromTheApi(
            {oldestData: nextPage, filter, pagination: startItemPagination},
            this._tzStatApi,
          )
          .pipe(
            map(({transactions}) => ({
              transactions,
              pagination: {...startItemPagination, limit: pagination.limit},
            })),
          );
      }),
      map((value: {transactions: Operation[]; pagination: PaginationData}) =>
        fromActions.updateTzStatsFilterDataSuccess({
          transactions: value.transactions,
          pagination: value.pagination,
        }),
      ),
    );
  });

  _getMostRecentCycle$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(fromActions.mostRecentCycleRequest),
      switchMap(() => this._tzStatApi.getMostRecentCycle()),
      map((value: number) =>
        fromActions.mostRecentCycleSuccess({cycleNumber: value}),
      ),
    );
  });
}
