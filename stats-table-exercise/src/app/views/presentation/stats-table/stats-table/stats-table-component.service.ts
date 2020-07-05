import {Injectable} from '@angular/core';

export interface StatsTableComponentEvent {
  older: boolean;
}

@Injectable({providedIn: 'root'})
export class StatsTableComponentService {}
