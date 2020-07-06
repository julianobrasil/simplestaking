import {createReducer, on, Action} from '@ngrx/store';

import produce from 'immer';

import {PaginationData, FilterData, Operation} from '../../models';

import * as fromActions from './tz-stats-table.actions';

export const tzStatsTableFeatureKey = 'TzStatsTableState';

export interface TzStatsTableState {
  pagination: PaginationData;
  filter: FilterData;
  data: Record<string, Operation> | null;
  dataLoading: boolean;
  dataIds: number[];
  mostRecentCycle: number;
}

export const initialState: TzStatsTableState = {
  pagination: {
    firstRowIdInStore: null,
    lastRowIdInStore: null,
    limit: 10,
  },
  filter: {
    userAddress: null,
    receiverAddress: null,
    senderAddress: null,
  },
  data: {},
  dataLoading: false,
  dataIds: [],
  mostRecentCycle: 0,
};

function _updatePaginationRequest(
  state: TzStatsTableState,
  _nextPage: boolean,
): TzStatsTableState {
  return produce(state, (draftState) => {
    draftState.dataLoading = true;
  });
}

function _resetPaginationRequest(state: TzStatsTableState): TzStatsTableState {
  return produce(state, (_draftState) => {});
}

function _updateFilterRequest(
  state: TzStatsTableState,
  filter: FilterData,
): TzStatsTableState {
  return produce(state, (draftState) => {
    draftState.filter = {...filter};
  });
}

function _updatePaginationSuccess(
  state: TzStatsTableState,
  transactions: Operation[],
): TzStatsTableState {
  return produce(state, (draftState) => {
    draftState.dataLoading = false;
    if (transactions.length) {
      transactions.forEach(
        (item: Operation) => (draftState.data['' + item.row_id] = item),
      );

      draftState.dataIds = Object.keys(draftState.data).map((i) => +i);
      // Decreasing value order (most recent id first)
      draftState.dataIds.sort((a, b) => b - a);
    }

    // Define the properties of the pagination information
    draftState.pagination.firstRowIdInStore =
      draftState.dataIds[draftState.dataIds.length - 1];
    draftState.pagination.lastRowIdInStore = draftState.dataIds[0];
  });
}

function _resetPaginationSuccess(
  state: TzStatsTableState,
  transactions: Operation[],
): TzStatsTableState {
  return produce(state, (draftState) => {
    if (transactions.length) {
      transactions.forEach(
        (item: Operation) => (draftState.data['' + item.row_id] = item),
      );

      draftState.dataIds = Object.keys(draftState.data).map((i) => +i);
      // Decreasing value order (most recent id first)
      draftState.dataIds.sort((a, b) => b - a);
    }

    // Define the properties of the pagination information
    draftState.pagination.firstRowIdInStore =
      draftState.dataIds[draftState.dataIds.length - 1];
    draftState.pagination.lastRowIdInStore = draftState.dataIds[0];
  });
}

function _updateFilterSuccess(
  state: TzStatsTableState,
  transactions: Operation[],
  pagination: PaginationData,
): TzStatsTableState {
  return produce(state, (draftState) => {
    draftState.data = {};
    draftState.dataIds = [];
    if (transactions.length) {
      transactions.forEach(
        (item: Operation) => (draftState.data['' + item.row_id] = item),
      );

      draftState.dataIds = Object.keys(draftState.data).map((i) => +i);
      // Decreasing value order (most recent id first)
      draftState.dataIds.sort((a, b) => b - a);
    }

    draftState.pagination = {...pagination};

    // Define the properties of the pagination information
    draftState.pagination.firstRowIdInStore =
      draftState.dataIds[draftState.dataIds.length - 1];
    draftState.pagination.lastRowIdInStore = draftState.dataIds[0];
  });
}

function _mostRecentCycleSuccess(
  state: TzStatsTableState,
  cycleNumber: number,
): TzStatsTableState {
  return produce(state, (draftState) => {
    draftState.mostRecentCycle = cycleNumber;
  });
}

const tzStatsTableReducer = createReducer(
  initialState,
  on(
    fromActions.updatePageDataRequest,
    (state: TzStatsTableState, {oldestData: nextPage}) =>
      _updatePaginationRequest(state, nextPage),
  ),
  on(
    fromActions.updatePageDataSuccess,
    (state: TzStatsTableState, {transactions}) =>
      _updatePaginationSuccess(state, transactions),
  ),
  on(fromActions.resetPageDataRequest, (state: TzStatsTableState) =>
    _resetPaginationRequest(state),
  ),
  on(
    fromActions.resetPageDataSuccess,
    (state: TzStatsTableState, {transactions}) =>
      _resetPaginationSuccess(state, transactions),
  ),
  on(
    fromActions.updateTzStatsFilterDataRequest,
    (state: TzStatsTableState, {filter}) => _updateFilterRequest(state, filter),
  ),
  on(
    fromActions.updateTzStatsFilterDataSuccess,
    (state: TzStatsTableState, {transactions, pagination}) =>
      _updateFilterSuccess(state, transactions, pagination),
  ),
  on(
    fromActions.mostRecentCycleSuccess,
    (state: TzStatsTableState, {cycleNumber}) =>
      _mostRecentCycleSuccess(state, cycleNumber),
  ),
);

export function reducer(
  state: TzStatsTableState | undefined,
  action: Action,
): TzStatsTableState {
  return tzStatsTableReducer(state, action);
}
