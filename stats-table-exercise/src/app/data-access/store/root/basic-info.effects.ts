import {Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';

import {switchMap, map} from 'rxjs/operators';

import {TzStatsApi} from '../../api/tz-stats.api';

import * as fromActions from './basic-info.actions';

@Injectable()
export class BasicInfoEffects {
  constructor(
    private _actions$: Actions,
    private _tzStatApi: TzStatsApi,
  ) {}

  _getTzExchangeRateInDollar$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(fromActions.txExchangeRateRequest),
      switchMap(() => this._tzStatApi.getLastClosingDollarExchangeRate()),
      map(({date, closingValue}) =>
        fromActions.tzExchangeRateSuccess({date, closingValue}),
      ),
    );
  });
}
