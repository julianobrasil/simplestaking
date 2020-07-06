import {Pipe, PipeTransform} from '@angular/core';
import {Operation} from '../../../../../data-access/models';

@Pipe({name: 'operationType'})
export class OperationTypePipe implements PipeTransform {
  transform(value: Operation, args: {userAddress: string}): string {
    if (!value || !args?.userAddress) {
      return '';
    }

    if (value.reward) {
      return 'Reward';
    }

    if (value.sender === args.userAddress) {
      return 'Sent';
    }

    if (value.receiver === args.userAddress) {
      return 'Received';
    }
  }
}
