import {createAction, props} from '@ngrx/store';
import {
  RequestTransactionsFilter,
  ResponseTransactionObject,
  PaginationData,
  Operation,
  FilterData,
} from '../../models';

export enum UPDATE_PAGE_DATA {
  REQUEST = '[stats-table]: Update page data',
  SUCCESS = '[stats-table]: Update page data SUCCESS',
  FAILL = '[stats-table]: Update page data FAIL',
}

export const updatePageDataRequest = createAction(
  UPDATE_PAGE_DATA.REQUEST,
  props<{oldestData: boolean}>(),
);

export const updatePageDataSuccess = createAction(
  UPDATE_PAGE_DATA.SUCCESS,
  props<{transactions: Operation[]}>(),
);

export enum RESET_PAGE_DATA {
  REQUEST = '[stats-table]: Reset page data',
  SUCCESS = '[stats-table]: Reset page data SUCCESS',
  FAILL = '[stats-table]: Reset page data FAIL',
}

export const resetPageDataRequest = createAction(RESET_PAGE_DATA.REQUEST);

export const resetPageDataSuccess = createAction(
  RESET_PAGE_DATA.SUCCESS,
  props<{transactions: Operation[]}>(),
);

export enum UPDATE_TZ_STATS_FILTER {
  REQUEST = '[stats-table]: Update filter data',
  SUCCESS = '[stats-table]: Update filter data SUCCESS',
  FAILL = '[stats-table]: Update filter data FAIL',
}

export const updateTzStatsFilterDataRequest = createAction(
  UPDATE_TZ_STATS_FILTER.REQUEST,
  props<{filter: FilterData}>(),
);

export const updateTzStatsFilterDataSuccess = createAction(
  UPDATE_TZ_STATS_FILTER.SUCCESS,
  props<{
    transactions: Operation[];
    pagination: PaginationData;
  }>(),
);

export enum GET_MOST_RECENT_CYCLE {
  REQUEST = '[stats-table]: Get the most recent cycle data',
  SUCCESS = '[stats-table]: Get the most recent cycle SUCCESS',
}

export const mostRecentCycleRequest = createAction(
  GET_MOST_RECENT_CYCLE.REQUEST,
);

export const mostRecentCycleSuccess = createAction(
  GET_MOST_RECENT_CYCLE.SUCCESS,
  props<{cycleNumber: number}>(),
);
