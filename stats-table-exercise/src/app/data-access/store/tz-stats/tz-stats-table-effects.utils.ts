import {Observable, of, forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';

import {Operation, PaginationData, FilterData} from '../../models';

import {TzStatsApi} from '../../api/tz-stats.api';

/** Go and get more data directly from the API */
export function retrieveDataFromTheApi(
  args: {
    oldestData: boolean;
    filter: FilterData;
    pagination: PaginationData;
  },
  tzStatsApi: TzStatsApi,
): Observable<{transactions: Operation[]}> {
  if (args.filter?.userAddress) {
    // Use the same user token for the sender OR receiver
    return forkJoin([
      tzStatsApi.getTzTransactions(
        {receiver: args.filter.userAddress},
        args.pagination,
        args.oldestData,
      ),
      tzStatsApi.getTzTransactions(
        {sender: args.filter?.userAddress},
        args.pagination,
        args.oldestData,
      ),
    ]).pipe(
      map(([onlyReceiver, onlySender]: Array<Operation[]>) => ({
        transactions: onlyReceiver.concat(onlySender),
      })),
    );
  } else {
    // Use receiver OR sender (you cannot have both here or you're gonna get strange results)
    const filter = {
      receiver: args.filter.receiverAddress,
      sender: args.filter.senderAddress,
    };
    return tzStatsApi
      .getTzTransactions(filter, args.pagination, args.oldestData)
      .pipe(map((ops: Operation[]) => ({transactions: ops})));
  }
}
