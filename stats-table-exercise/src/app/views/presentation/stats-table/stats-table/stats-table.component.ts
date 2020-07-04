import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  StatsTableComponentService,
  StatsTableComponentEvent,
} from './stats-table-component.service';
import {Operation} from 'src/app/data-access/models';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Subject, combineLatest} from 'rxjs';
import {
  takeUntil,
  debounceTime,
  pairwise,
  startWith,
  take,
} from 'rxjs/operators';

@Component({
  selector: 'app-stats-table',
  templateUrl: './stats-table.component.html',
  styleUrls: ['./stats-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsTableComponent implements OnDestroy {
  @Input()
  get transactions(): Operation[] {
    return this._transactions;
  }
  set transactions(value: Operation[]) {
    const oldAmountOfTransactions = this._transactions.length;
    this._transactions = value;
    if (value?.length && !oldAmountOfTransactions) {
      // This setInterval is due to the fact that the virtual scrolling component isn't immediately
      // available between the *ngIf actions of destroying and rebuilding it. As it can happen after
      // the initialization of this component, we cannot put it inside a regular life cycle hook,
      // like ngAfterViewInit
      const interval1 = setInterval(() => {
        if (!this._virtualScrolling) {
          return;
        }
        this._setupObservables();
        clearInterval(interval1);
      }, 500);
    } else if (!value?.length && !oldAmountOfTransactions) {
      this._unsubscribeOnlyFromVirtualScroll$.next();
    }
  }
  private _transactions: Operation[] = [];

  @Input()
  filteredUser: string;

  @Input()
  dataLoading: boolean;

  @Input()
  exchangeRate: number;

  @Input()
  mostRecentCycle: number;

  @Output()
  dataRequested: EventEmitter<StatsTableComponentEvent> = new EventEmitter<
    StatsTableComponentEvent
  >();

  @ViewChild(CdkVirtualScrollViewport)
  _virtualScrolling: CdkVirtualScrollViewport;

  _hasScrollbar: boolean;

  /**
   * When *ngIf on virtual scroll remove it from the dom, it's necessary to unsubscribe and
   * resubscribe all the observables that are currently subscribed on them. In situations like this,
   * it's better to have an exclusive unsubscriber Subject.
   */
  private _unsubscribeOnlyFromVirtualScroll$: Subject<void> = new Subject<
    void
  >();

  constructor() {}

  ngOnDestroy(): void {
    if (
      this._unsubscribeOnlyFromVirtualScroll$ &&
      !this._unsubscribeOnlyFromVirtualScroll$.closed
    ) {
      this._unsubscribeOnlyFromVirtualScroll$.next();
      this._unsubscribeOnlyFromVirtualScroll$.complete();
    }
  }

  _retrieveRecentTransactions(): void {
    if (this._virtualScrolling.measureScrollOffset('top')) {
      this._virtualScrolling.scrollToIndex(0);
    } else {
      this.dataRequested.emit({older: false});
    }
  }

  private _setupObservables(): void {
    // Observe the amount of data to decide wheather there is a scroll bar or not
    // This is important for the alignment of the table header columns and the body columns
    if (!this._virtualScrolling) {
      return;
    }
    this._virtualScrolling.renderedRangeStream
      .pipe(takeUntil(this._unsubscribeOnlyFromVirtualScroll$))
      .subscribe(
        (value: {start: number; end: number}) =>
          (this._hasScrollbar = value.end - value.start > 10),
      );

    // Observe the position of the scrollbar (via index emitted by cdkVirtualScroll) to decide
    // whether to go to the database to retrieve more data
    this._virtualScrolling.scrolledIndexChange
      .pipe(
        startWith(0),
        debounceTime(500),
        pairwise(),
        takeUntil(this._unsubscribeOnlyFromVirtualScroll$),
      )
      .subscribe(([previousIndex, currentIndex]: [number, number]) => {
        if (!this.transactions.length || this.dataLoading) {
          return;
        }

        // Number of items visible in the virtual scroll viewport
        const viewPortLength = 10;
        // 10 items shown in the visible area of the virtual scroll and 10 items
        // buffered for perfomance.
        const minimumDataLength = 20;
        const isScrollingDown = currentIndex > previousIndex;
        const moreDataThanTheMinimum =
          this.transactions.length > minimumDataLength;
        const scrollbarInTheBottom =
          currentIndex === this.transactions.length - viewPortLength;
        const scrollbarInTheTop = !currentIndex;

        if (
          isScrollingDown &&
          ((moreDataThanTheMinimum &&
            currentIndex >= this.transactions.length - minimumDataLength) ||
            (!moreDataThanTheMinimum && scrollbarInTheBottom))
        ) {
          this.dataRequested.emit({older: true});
        } else if (
          !isScrollingDown &&
          ((moreDataThanTheMinimum && currentIndex < minimumDataLength) ||
            (!moreDataThanTheMinimum && scrollbarInTheTop))
        ) {
          this.dataRequested.emit({older: false});
        }
      });
  }
}
