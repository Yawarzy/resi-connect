import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface SelectFieldOption {
  label: string;
  value: string;
  default?: boolean;
}

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit {
  /** Placeholder for the select field */
  @Input() placeholder: string = 'Select an option';

  /** Options for the select field */
  @Input() options: SelectFieldOption[] | undefined;

  /** Size of the select field */
  @Input() size: 'large' | 'small' | 'default' = 'default';

  /** Mode of the select field */
  @Input() mode: 'multiple' | 'tags' | 'default' = 'default';

  /** Selected value of the select field */
  @Input() selectedValue: string | undefined;

  /** Whether the select field is disabled */
  @Input() disabled: boolean = false;


  @Output() onValueChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  valueChange(value: string) {
    this.onValueChange.next(value);
  }

}
