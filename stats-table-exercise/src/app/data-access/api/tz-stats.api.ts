import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable, of, iif} from 'rxjs';
import {map, catchError, switchMap, delay} from 'rxjs/operators';

import {Operation} from '../models/operation.model';
import {PaginationData} from '../models';

@Injectable({providedIn: 'root'})
export class TzStatsApi {
  private readonly _baseUrl = 'https://api.tzstats.com/tables/op';
  private readonly _dolarUrl =
    'https://api.staging.tzstats.com/series/bittrex/XTZ_USD/ohlcv?columns=time,close&limit=7&start_date=now-7d&collapse=1d';
  private readonly _cyclesUrl = 'https://api.tzstats.com/explorer/tip';

  constructor(private _httpClient: HttpClient) {}

  /**
   * Get all the transactions, paged, from a specific user
   *
   * @param searchParams Inform the filters used to perform the search. Currently we're using just
   * the sender OR the receiver (not both at the same time)
   * @param [pagination] Contain information like the number of operations that should be retrieved
   * from the database
   * @param [olderData] When present, inform whether the data retrived from the database should be
   * greater than a specific row_id (false => more recent operations) or less than a specific row_id
   * (true => olderData). The necessary row_ids to perform this decision are present in pagination information.
   */
  getTzTransactions(
    searchParams: {receiver?: string; sender?: string},
    pagination?: PaginationData,
    olderData?: boolean,
  ): Observable<Operation[]> {
    if (!(searchParams.receiver || searchParams.sender)) {
      return of([]);
    }

    let params: HttpParams = new HttpParams()
      .set(
        'columns',
        'row_id,cycle,time,sender,receiver,volume,fee,reward,deposit',
      )
      .set('type', 'transaction')
      .set('order', 'desc')
      .set('limit', `${pagination?.limit ?? 10}`);

    for (const searchKey of Object.keys(searchParams)) {
      if (searchParams[searchKey]) {
        params = params.set(searchKey, `${searchParams[searchKey]}`);
      }
    }

    if (olderData !== undefined && olderData !== null) {
      if (olderData && pagination.firstRowIdInStore) {
        params = params.set('cursor.lte', `${pagination.firstRowIdInStore}`);
      } else if (!olderData && pagination.lastRowIdInStore) {
        params = params.set('cursor.gte', `${pagination.lastRowIdInStore}`);
      }
    }

    return this._httpClient
      .get<Array<Array<string | number | boolean>>>(this._baseUrl, {params})
      .pipe(
        map((transactions: Array<Array<string | number | boolean>>) => {
          return transactions.map((t: Array<string | number | boolean>) => ({
            row_id: t[0] as number,
            cycle: t[1] as number,
            time: new Date(t[2] as string),
            sender: t[3] as string,
            receiver: t[4] as string,
            volume: t[5] as number,
            fee: t[6] as number,
            reward: t[7] as number,
            deposit: t[8] as number,
          }));
        }),
        catchError((err: any) => of([])),
      );
  }

  /** Get the closing exchange rate of Tezo related to dollar from  bittrex */
  getLastClosingDollarExchangeRate(): Observable<{
    date: Date;
    closingValue: number;
  }> {
    return this._httpClient.get<Array<number[]>>(this._dolarUrl).pipe(
      map((value: Array<number[]>) => {
        return {
          date: new Date(value[value.length - 1][0]),
          closingValue: value[value.length - 1][1],
        };
      }),
      // This will avoid operations of convertion to use this current value.
      // This is an workaround probably better handled with some user friendly error
      // message, like a snackbar
      catchError((err) => of({date: new Date(), closingValue: -1})),
    );
  }

  getMostRecentCycle(): Observable<number> {
    return this._httpClient.get<any>(this._cyclesUrl).pipe(
      map((value: any) => value.cycle),
      // This will avoid operations based on the current cycle to consider the cycle finished
      // of an error. This is an workaround probably better handled with some user friendly error
      // message, like a snackbar
      catchError((err: any) => of(1000000000)),
    );
  }
}
