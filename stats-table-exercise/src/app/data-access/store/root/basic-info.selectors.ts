import {createSelector} from '@ngrx/store';

import {PaginationData} from '../../models';

import * as reducers from './basic-info.reducer';

export const getFeature = (state: {
  [reducers.basicInfoKey]: reducers.BasicInfoState;
}) => state[reducers.basicInfoKey];

export const getExchangeRate = createSelector(
  getFeature,
  (state: reducers.BasicInfoState) => state?.exchangeRage,
);

export const getExchangeRateByCurrency = createSelector(
  getFeature,
  getExchangeRate,
  (
    _state: reducers.BasicInfoState,
    exchangeRate: {[currency: string]: {date: Date; closingValue: number}},
    props: {currency: string},
  ) =>
    exchangeRate[props.currency]
      ? exchangeRate[props.currency].closingValue ?? 0
      : 0,
);
