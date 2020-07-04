import {Pipe, PipeTransform} from '@angular/core';
import {Operation} from '../../../../../data-access/models';

@Pipe({name: 'volumeSignal'})
export class VolumeSignalPipe implements PipeTransform {
  transform(value: Operation, args: {userToken: string}): string {
    if (!value || !args?.userToken) {
      return '';
    }

    if (value.sender === args.userToken) {
      return '-';
    }

    if (value.receiver === args.userToken) {
      return '+';
    }
  }
}
