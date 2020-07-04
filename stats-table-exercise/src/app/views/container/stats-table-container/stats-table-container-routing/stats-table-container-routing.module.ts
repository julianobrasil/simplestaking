import {NgModule} from '@angular/core';
import {Router, Route, RouterModule} from '@angular/router';

import {StatsTableContainerComponent} from '../stats-table-container/stats-table-container.component';
import {StatsTableContainerRoutingComponent} from './stats-table-container-routing.component';

const routes: Route[] = [
  {
    path: '',
    component: StatsTableContainerRoutingComponent,
    children: [
      {
        path: '',
        component: StatsTableContainerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsTableContainerRoutingModule {}
