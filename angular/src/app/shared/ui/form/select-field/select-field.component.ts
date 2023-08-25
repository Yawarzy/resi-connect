import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseInputComponent} from "../base/base-input.component";

export interface SelectFieldOption {
  label: string;
  value: string | number | boolean;
  default?: boolean;
}

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends BaseInputComponent {
  /** Options for the select field */
  @Input() options: SelectFieldOption[] | undefined;

  /** Mode of the select field */
  @Input() mode: 'multiple' | 'tags' | 'default' = 'default';

  /** Selected value of the select field */
  @Input() selectedValue: string | boolean | undefined;

  @Output() onValueChange = new EventEmitter<string>();

  valueChange(value: string) {
    this.onValueChange.next(value);
  }

}
