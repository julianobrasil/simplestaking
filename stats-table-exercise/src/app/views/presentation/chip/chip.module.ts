import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {ChipComponent} from './chip/chip.component';
import {CustomMaterialModule} from './custom-material.module';

@NgModule({
  declarations: [
    ChipComponent
  ],
  imports: [
    /** ANGULAR IMPORTS */
    CommonModule,
    ReactiveFormsModule,

    /** ChipModule IMPORTS */
    CustomMaterialModule,
  ],
  exports: [ChipComponent],
})
export class ChipModule {}
