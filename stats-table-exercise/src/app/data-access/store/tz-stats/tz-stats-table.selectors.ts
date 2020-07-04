import {createSelector} from '@ngrx/store';

import {PaginationData} from '../../models';

import * as reducers from './tz-stats-table.reducer';

export const getFeature = (state: {
  [reducers.tzStatsTableFeatureKey]: reducers.TzStatsTableState;
}) => state[reducers.tzStatsTableFeatureKey];

export const getPagination = createSelector(
  getFeature,
  (state: reducers.TzStatsTableState) => state?.pagination,
);

export const getFilter = createSelector(
  getFeature,
  (state: reducers.TzStatsTableState) => state?.filter,
);

export const getDataLoading = createSelector(
  getFeature,
  (state: reducers.TzStatsTableState) => state?.dataLoading,
);

export const getMostRecentCycleNumber = createSelector(
  getFeature,
  (state: reducers.TzStatsTableState) => state?.mostRecentCycle ?? null,
);

export const getCurrentPageTransactions = createSelector(
  getFeature,
  getPagination,
  (state: reducers.TzStatsTableState, pagination: PaginationData) =>
    state.dataIds.map((i: number) => state.data['' + i]),
);
