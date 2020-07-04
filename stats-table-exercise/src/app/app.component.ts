import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromRootStore from './data-access/store/root';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tezo Stats';

  constructor(_store: Store<fromRootStore.BasicInfoState>) {
    _store.dispatch(fromRootStore.txExchangeRateRequest());
  }
}
