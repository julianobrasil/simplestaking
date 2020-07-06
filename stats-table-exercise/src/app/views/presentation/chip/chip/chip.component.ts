import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  /** The style to be applied to the chip */
  @Input()
  style: Record<string, string | number>;

  /** The text that appears inside the chip */
  @Input()
  value: string;

  @Input()
  disabled: boolean;
}
