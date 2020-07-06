import {Pipe, PipeTransform} from '@angular/core';
import {Operation} from '../../../../../data-access/models';

@Pipe({name: 'operationChipStyle'})
export class OperationChipStylePipe implements PipeTransform {
  transform(
    value: Operation,
    args: {userAddress: string; mostRecentCycle: number},
  ): Record<string, string | number> {
    if (!value || !args?.userAddress || !args.mostRecentCycle) {
      return {};
    }

    if (value.reward) {
      return {
        'border-radius': '0.8rem',
        padding: '5px 10px',
        height: '1.3rem',
        'background-color': 'yellow',
      };
    }

    if (value.sender === args.userAddress) {
      return {
        'border-radius': '0.8rem',
        padding: '5px 10px',
        height: '1.3rem',
        'background-color': 'rgba(0,0,0,0.07)',
      };
    }

    if (value.receiver === args.userAddress) {
      return {
        'border-radius': '0.8rem',
        padding: '5px 10px',
        height: '1.3rem',
        'background-color': 'rgb(214, 255, 214)',
        color: '#0f2d0f',
      };
    }
  }
}
