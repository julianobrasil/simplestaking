import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

import {environment} from '../environments/environment';

import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';

import {BasicInfoEffects} from './data-access/store/root/basic-info.effects';
import * as fromRootStore from './data-access/store/root';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      [fromRootStore.basicInfoKey]: fromRootStore.reducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([BasicInfoEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
