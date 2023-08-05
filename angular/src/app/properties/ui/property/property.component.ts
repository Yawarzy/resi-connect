import {Component, Input, OnInit} from '@angular/core';
import {Property} from "../../data-access/properties.service";
import {AppUtil} from "../../../app-util";

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

  protected readonly AppUtil = AppUtil;
}
