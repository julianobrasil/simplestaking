import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {ChipModule} from '../chip/chip.module';
import {CustomMaterialModule} from './custom-material.module';

import {StatsTableComponent} from './stats-table/stats-table.component';

import {FinalAmountPipe} from './stats-table/pipes/final-amount.pipe';
import {OperationChipStylePipe} from './stats-table/pipes/operation-chip-style.pipe';
import {OperationTypePipe} from './stats-table/pipes/operation-type.pipe';
import {PartialAddressPipe} from './stats-table/pipes/partial-address.pipe';
import {VolumeSignalPipe} from './stats-table/pipes/volume-signal.pipe';

@NgModule({
  declarations: [
    StatsTableComponent,

    /** PIPES */
    FinalAmountPipe,
    OperationChipStylePipe,
    OperationTypePipe,
    PartialAddressPipe,
    VolumeSignalPipe,
  ],
  imports: [
    /** ANGULAR IMPORTS */
    CommonModule,
    ReactiveFormsModule,

    /** StatsTableModule IMPORTS */
    CustomMaterialModule,
    ChipModule,
  ],
  exports: [StatsTableComponent],
})
export class StatsTableModule {}
