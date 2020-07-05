import {NgModule} from '@angular/core';
import {Router, Route, RouterModule} from '@angular/router';

import {StatsTableComponent} from '../stats-table/stats-table.component';
import {StatsTableRoutingComponent} from './stats-table-routing.component';

const routes: Route[] = [
  {
    path: '',
    component: StatsTableRoutingComponent,
    children: [
      {
        path: '',
        component: StatsTableComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsTableRoutingModule {}
