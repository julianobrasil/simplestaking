import {Pipe, PipeTransform} from '@angular/core';
import {Operation} from '../../../../../data-access/models';

@Pipe({name: 'operationType'})
export class OperationTypePipe implements PipeTransform {
  transform(value: Operation, args: {userToken: string}): string {
    if (!value || !args?.userToken) {
      return '';
    }

    if (value.reward) {
      return 'Reward';
    }

    if (value.sender === args.userToken) {
      return 'Sent';
    }

    if (value.receiver === args.userToken) {
      return 'Received';
    }
  }
}
