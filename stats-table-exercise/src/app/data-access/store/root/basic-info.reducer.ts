import {createReducer, on, Action} from '@ngrx/store';

import produce from 'immer';

import {PaginationData, FilterData, Operation} from '../../models';

import * as fromActions from './basic-info.actions';

export const basicInfoKey = 'BasicInfo';

export interface BasicInfoState {
  exchangeRage: {
    dollar: {
      date: Date;
      closingValue: number;
    } | null;
  };
}

export const initialState: BasicInfoState = {
  exchangeRage: {
    dollar: null,
  },
};

function _updateTzExchangeRateSuccess(
  state: BasicInfoState,
  data: {date: Date; closingValue: number},
): BasicInfoState {
  return produce(state, (draftState) => {
    draftState.exchangeRage.dollar = data;
  });
}

const basicInfoReducer = createReducer(
  initialState,
  on(
    fromActions.tzExchangeRateSuccess,
    (state: BasicInfoState, {date, closingValue}) =>
      _updateTzExchangeRateSuccess(state, {date, closingValue}),
  ),
);

export function reducer(
  state: BasicInfoState | undefined,
  action: Action,
): BasicInfoState {
  return basicInfoReducer(state, action);
}
