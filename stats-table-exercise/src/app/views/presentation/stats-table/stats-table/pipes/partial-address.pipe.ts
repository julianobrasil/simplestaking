import {Pipe, PipeTransform} from '@angular/core';
import {Operation} from '../../../../../data-access/models';

@Pipe({name: 'partialAddress'})
export class PartialAddressPipe implements PipeTransform {
  transform(value: Operation, args: {userToken: string}): string {
    if (!value || !args?.userToken) {
      return '';
    }

    if (value.sender === args.userToken) {
      return (
        value.receiver.substr(0, 2) +
        '...' +
        value.receiver.split('').reverse().slice(0, 5).reverse().join('')
      );
    }

    if (value.receiver === args.userToken) {
      return (
        value.sender.substr(0, 2) +
        '...' +
        value.sender.split('').reverse().slice(0, 5).reverse().join('')
      );
    }
  }
}
