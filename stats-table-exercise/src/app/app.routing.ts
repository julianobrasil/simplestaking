import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

export const routes: Routes = [
  {
    path: 'stats-table',
    loadChildren: () =>
      import('./views/container/stats-table-container').then(
        (m) => m.StatsTableContainerModule,
      ),
  },
  {path: '**', pathMatch: 'full', redirectTo: 'stats-table'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {}
