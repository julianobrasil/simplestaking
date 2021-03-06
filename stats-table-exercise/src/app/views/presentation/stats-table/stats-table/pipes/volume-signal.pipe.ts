import {Pipe, PipeTransform} from '@angular/core';
import {Operation} from '../../../../../data-access/models';

@Pipe({name: 'volumeSignal'})
export class VolumeSignalPipe implements PipeTransform {
  transform(value: Operation, args: {userAddress: string}): string {
    if (!value || !args?.userAddress) {
      return '';
    }

    if (value.sender === args.userAddress) {
      return '-';
    }

    if (value.receiver === args.userAddress) {
      return '+';
    }
  }
}
