import {NgModule} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  exports: [MatButtonModule, MatIconModule, ScrollingModule],
})
export class CustomMaterialModule {}
