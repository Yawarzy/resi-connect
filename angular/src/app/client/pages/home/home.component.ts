import {Component, OnInit} from '@angular/core';
import {SelectFieldOption} from "../../../shared";
import {PropertiesService, Property} from "../../_services/properties.service";
import {AppUtil} from "../../../app-util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedLocation: string = 'all';
  locations: SelectFieldOption[] | undefined;
  popularAccommodations: Property[] | undefined;
  protected readonly AppUtil = AppUtil;

  constructor(private propertiesService: PropertiesService) {
  }

  ngOnInit(): void {
    this.fetchPropertiesAndLocations();
  }

  private fetchPropertiesAndLocations() {
    this.propertiesService.fetchItems(
      (data: { properties: Property[] }) => {
        data.properties = data.properties.map((property: any) => {
          return {
            ...property,
            photos: property.photos.slice(1, -1).split(',')
          }
        });
        this.popularAccommodations = data.properties.slice(0, 3);

        this.locations = data.properties.reduce((acc: SelectFieldOption[], property: Property) => {
          if (acc.find((location: any) => location.value === property.locality)) {
            return acc;
          }
          return [...acc, {label: property.locality, value: property.locality}];
        }, [{label: 'All', value: 'all', default: true}] as SelectFieldOption[]);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
