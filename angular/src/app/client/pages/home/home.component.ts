import {Component, OnInit} from '@angular/core';
import {SelectFieldOption} from "../../../shared";
import {PropertiesService, Property} from "../../_services/properties.service";
import {AppUtil} from "../../../app-util";
import {Router} from "@angular/router";

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

  constructor(private propertiesService: PropertiesService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchPropertiesAndLocations();
  }

  // go to properties page with selected location
  goToPropertiesPage() {
    this.router.navigate(['/properties'], {queryParams: {locality: this.selectedLocation}});
  }

  private fetchPropertiesAndLocations() {
    this.propertiesService.fetchItems(
      (data: { properties: Property[], localities: { locality: string }[] }) => {
        data.properties = data.properties.map((property: any) => {
          return {
            ...property,
            photos: JSON.parse(property.photos)
          }
        });
        this.popularAccommodations = data.properties.slice(0, 3);

        this.locations = data.localities.reduce((acc: SelectFieldOption[], locality: { 'locality': string }) => {
          if (acc.find((location: any) => location.value === locality.locality)) {
            return acc;
          }
          return [...acc, {label: locality.locality, value: locality.locality}];
        }, [{label: 'All', value: 'all', default: true}] as SelectFieldOption[]);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
