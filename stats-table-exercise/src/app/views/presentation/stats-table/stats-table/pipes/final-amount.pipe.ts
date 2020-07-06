import {Pipe, PipeTransform} from '@angular/core';
import {Operation} from '../../../../../data-access/models';

@Pipe({name: 'finalAmount'})
export class FinalAmountPipe implements PipeTransform {
  transform(value: Operation, args: {userAddress: string}): number {
    if (!value || !args?.userAddress) {
      return 0;
    }

    const total = value.volume + value.fee;

    if (value.sender === args.userAddress) {
      return total;
    }

    if (value.receiver === args.userAddress) {
      return total;
    }
  }
}
