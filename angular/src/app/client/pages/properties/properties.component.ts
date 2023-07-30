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
    ppm: [5000, 15000],
    min: 5000,
    max: 15000,
    page: 1,
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
  showFilters = false;
  count = {
    totalCount: 0,
    filteredCount: 0
  }
  pagination: any;

  constructor(private propertiesService: PropertiesService) {
  }

  ngOnInit(): void {
    this.fetchProperties();
  }

  fetchProperties(filters?: any) {
    this.propertiesService.getProperties((data: { properties: Property[], count: any, links: any, meta: any }) => {
      this.properties = data.properties;
      this.count = data.count;
      this.pagination = {
        links: data.links,
        meta: data.meta
      }
      console.log(data);
      if (!filters) {
        this.initLocations(data.properties);
      }

    }, (err: any) => {
      console.log(err);
    }, filters);
  }

  applyFilter() {
    const {locality, type, is_pg, ppm} = this.filters;
    const filters = {
      locality,
      type,
      is_pg,
      min: ppm[0],
      max: ppm[1]
    }
    this.fetchProperties(filters);
  }

  resetFilter() {
    this.filters = {
      locality: 'all',
      type: 'all',
      is_pg: 'any',
      ppm: [5000, 15000],
      min: 5000,
      max: 15000,
      page: 1,
    }
    this.fetchProperties();
  }

  goToPage(page: number) {
    // Function to navigate to a specific page using the pagination link URL
    this.fetchProperties(
      {
        ...this.filters,
        page
      }
    )

  }

  getNumberedLinks(): number[] {
    // Helper function to create an array of page numbers for the numbered links
    const totalPages = this.pagination?.meta?.last_page;
    return Array.from({length: totalPages}, (_, i) => i + 1);
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
