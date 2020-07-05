import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {StatsTableContainerComponent} from './stats-table-container/stats-table-container.component';
import {StatsTableContainerRoutingModule} from './stats-table-container-routing/stats-table-container-routing.module';
import {StatsTableContainerRoutingComponent} from './stats-table-container-routing/stats-table-container-routing.component';
import {CustomMaterialModule} from './custom-material.module';

import {StatsTableModule} from '../../presentation/stats-table';

import * as tzStatsTableReducer from '../../../data-access/store/tz-stats/tz-stats-table.reducer';
import * as tzStatsTableEffects from '../../../data-access/store/tz-stats/tz-stats-table.effects';

@NgModule({
  declarations: [
    StatsTableContainerRoutingComponent,
    StatsTableContainerComponent,
  ],
  imports: [
    /** ANGULAR IMPORTS */
    CommonModule,
    ReactiveFormsModule,

    StoreModule.forFeature(
      tzStatsTableReducer.tzStatsTableFeatureKey,
      tzStatsTableReducer.reducer,
    ),

    EffectsModule.forFeature([tzStatsTableEffects.TzStatsTableEffects]),

    /** StatsTableContainerModule IMPORTS */
    StatsTableContainerRoutingModule,
    CustomMaterialModule,

    StatsTableModule,
  ],
  exports: [StatsTableContainerComponent],
})
export class StatsTableContainerModule {}
