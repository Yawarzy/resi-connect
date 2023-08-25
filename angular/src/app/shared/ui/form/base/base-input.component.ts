import {Component, Input, OnInit} from "@angular/core";

export type InputSize = 'large' | 'small' | 'default';

@Component({
  selector: 'app-base-input',
  template: ''
})
export abstract class BaseInputComponent implements OnInit {
  /** Placeholder */
  @Input() placeholder: string | undefined;

  /** Size of the field */
  @Input() size: InputSize = 'default';

  /** Disabled or not */
  @Input() disabled: boolean = false;

  ngOnInit(): void {
  }

}
