import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import {StatsTableContainerComponentService} from './stats-table-container-component.facade';
import {FormControl} from '@angular/forms';

import {Observable, Subject} from 'rxjs';
import {
  debounceTime,
  takeUntil,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';

import {Operation} from '../../../../data-access/models';
import {StatsTableComponentEvent} from '../../../presentation/stats-table';

@Component({
  selector: 'app-stats-table-container',
  templateUrl: './stats-table-container.component.html',
  styleUrls: ['./stats-table-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsTableContainerComponent {
  /** Input where the end user can type in the token of the user to filter the transactions */
  _inputNameCtrl: FormControl = new FormControl();

  /** The transactions of the user that is in the input */
  _transactions$: Observable<
    Operation[]
  > = this._componentService.getTransactions$();

  /** Given a currency, gives back the value of 1 Tezo in that currency */
  _tx2DollarExchangeRate$: Observable<
    number
  > = this._componentService.getExchangeRateByCurrency$('dollar');

  /** The the number of the most recent cycle (useful to calculate pending status) */
  _mostRecentCycle$: Observable<
    number
  > = this._componentService.getMostRecentCycle$();

  /** The status of the data retrieval from the API (true = ongoing data retrieval) */
  _dataLoading$: Observable<boolean> = this._componentService.getDataLoading$();

  /** Clean up all subscriptions when the component is destroyed */
  private _unsubscribe$: Subject<void> = new Subject<void>();

  /** Get the current user that is being used to filter the transactions */
  _filteredUser$ = this._componentService.getFilteredUser$().pipe(
    distinctUntilChanged(),
    tap((value: string) => this._inputNameCtrl.setValue(value)),
    takeUntil(this._unsubscribe$),
  );

  constructor(private _componentService: StatsTableContainerComponentService) {
    this._setupObservables();
  }

  /** Update the transactions when the user clicks on the button  */
  _getTransactions(): void {
    if (!this._inputNameCtrl.value) {
      return;
    }

    this._componentService.updateSearchFilter(this._inputNameCtrl.value);
  }

  /** When the user clicks on the clock button, ask for the most recent data from the server */
  _handleDataRequested(event: StatsTableComponentEvent): void {
    this._componentService.updatePagedData(event.older);
  }

  private _setupObservables(): void {
    this._inputNameCtrl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        this._componentService.updateSearchFilter(value);
      });

    // this._componentService.updateSearchFilter(
    //   'tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo',
    // );
  }
}
