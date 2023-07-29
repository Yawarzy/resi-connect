import {Component, OnInit} from '@angular/core';
import {PropertiesService, Property} from "../../_services/properties.service";
import {SelectFieldOption} from "../../../shared";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  filters = {
    locality: 'all',
    type: 'all',
    is_pg: 'any',
    ppm: [5000, 15000]
  }

  properties: Property[] | undefined;
  locations: SelectFieldOption[] | undefined;
  propertyTypes: SelectFieldOption[] = [
    {label: 'All', value: 'all', default: true},
    {label: 'Apartment', value: 'apartment'},
    {label: 'House', value: 'house'},
  ];
  pgOptions: SelectFieldOption[] = [
    {label: 'Any', value: 'any', default: true},
    {label: 'Yes', value: true},
    {label: 'No', value: false},
  ];

  constructor(private propertiesService: PropertiesService) {
  }

  ngOnInit(): void {
    this.fetchProperties();
  }

  fetchProperties(filters?: any) {
    this.propertiesService.getProperties((data: { properties: Property[] }) => {
      this.properties = data.properties;
      if (!filters) {
        this.initLocations(data.properties);
      }

    }, (err: any) => {
      console.log(err);
    }, filters);
  }

  applyFilter() {
    this.fetchProperties(this.filters);
    console.log(this.properties);
  }

  resetFilter() {
    this.filters = {
      locality: 'all',
      type: 'all',
      is_pg: 'any',
      ppm: [5000, 15000]
    }
    this.fetchProperties();
  }

  private initLocations(properties: Property[]) {
    this.locations = properties.reduce((acc: SelectFieldOption[], property: Property) => {
      if (acc.find((location: any) => location.value === property.locality)) {
        return acc;
      }
      return [...acc, {label: property.locality, value: property.locality}];
    }, [{label: 'All', value: 'all', default: true}] as SelectFieldOption[]);
  }
}
