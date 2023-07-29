import {Component, Input, OnInit} from '@angular/core';
import {Property} from "../../_services/properties.service";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() property: Property | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
