import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import {
  ChipComponentService,
} from './chip-component.service';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  @Input()
  style: Record<string, string | number>;

  @Input()
  value: string;

  constructor(private _componentService: ChipComponentService) {}
}
