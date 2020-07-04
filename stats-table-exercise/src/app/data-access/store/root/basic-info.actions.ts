import {createAction, props} from '@ngrx/store';

export enum TZ_EXCHANGE_RATE {
  REQUEST = '[GLOBAL SCOPE]: Request TZ exchange rate',
  SUCCESS = '[GLOBAL SCOPE]: Request TZ exchange rate success',
}

export const txExchangeRateRequest = createAction(TZ_EXCHANGE_RATE.REQUEST);

export const tzExchangeRateSuccess = createAction(
  TZ_EXCHANGE_RATE.SUCCESS,
  props<{date: Date; closingValue: number}>(),
);
