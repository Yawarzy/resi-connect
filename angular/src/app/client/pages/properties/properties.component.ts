import {Component, OnInit} from '@angular/core';
import {PropertiesService, Property} from "../../_services/properties.service";
import {SelectFieldOption} from "../../../shared";
import {Router} from "@angular/router";
import {FilterConfig, FilterCount} from "../../../shared/components/filter/filter.component";

interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
}

interface PropertyFilter {
  locality: string;
  type: string;
  is_pg: string | boolean;
  min_ppm: number,
  max_ppm: number,
  ppm?: any
}

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  paginationConfig = {
    page: 1,
    pageSize: 5
  }
  propertyFilter: any | undefined;
  properties: Property[] | undefined;
  locations: SelectFieldOption[] =
    [
      {label: 'All', value: 'all', default: true},
    ];
  propertyTypes: SelectFieldOption[] = [
    {label: 'All', value: 'all', default: true},
    {label: 'Apartment', value: 'apartment'},
    {label: 'House', value: 'house'},
  ];
  pgOptions: SelectFieldOption[] = [
    {label: 'Any', value: 'any', default: true},
    {label: 'Yes', value: "true"},
    {label: 'No', value: "false"},
  ];
  count = {
    totalCount: 0,
    filteredCount: 0
  }
  pagination: any;

  filterConfig: FilterConfig[] = [
    {
      filterType: 'select',
      label: 'Property Type',
      filterField: 'type',
      options: this.propertyTypes
    },
    {
      filterType: 'select',
      label: 'Locality',
      filterField: 'locality',
      options: this.locations,
    },
    {
      filterType: 'select',
      label: 'PG',
      filterField: 'is_pg',
      options: this.pgOptions
    },
    {
      filterType: 'range',
      label: 'Price Range',
      filterField: 'ppm',
      step: 500,
      value: [5000, 12000],
      min: 5000,
      max: 12000
    }
  ]

  constructor(private propertiesService: PropertiesService, private router: Router) {
    const {page, pageSize} = this.router.parseUrl(this.router.url).queryParams;
    this.paginationConfig = {
      page: page || 1,
      pageSize: pageSize || 3
    }
  }

  ngOnInit(): void {
    this.fetchProperties();
  }

  fetchProperties(filters?: any) {
    this.propertiesService.fetchItems((data: {
      properties: Property[],
      count: FilterCount,
      links: PaginationLinks,
      meta: PaginationMeta,
      localities: { 'locality': string }[]
    }) => {
      this.properties = data.properties.map((property: any) => {
        console.log(property.photos);
        return {
          ...property,
          photos: JSON.parse(property.photos),
        }
      });
      this.count = data.count;
      this.pagination = {
        links: data.links,
        meta: data.meta
      }
      this.transformLocalities(data.localities);
      // add page number to the query params
      this.router.navigate([], {
        queryParams: {
          ...this.router.parseUrl(this.router.url).queryParams,
          page: data.meta.current_page
        }
      });
    }, (err: any) => {
      console.log(err);
    }, this.paginationConfig, filters);
  }

  applyFilter(propertyFilter?: PropertyFilter) {
    if (!propertyFilter) {
      return;
    }
    this.router.navigate([], {
      queryParams: {
        ...this.paginationConfig,
        page: 1
      },
      queryParamsHandling: 'merge'
    });
    this.propertyFilter = propertyFilter;
    this.fetchProperties(propertyFilter);
  }

  resetFilter() {
    this.propertyFilter = undefined;
    this.fetchProperties({});
  }

  goToPage(page: number) {
    // add the page number to the query params
    this.router.navigate([], {
      queryParams: {
        ...this.router.parseUrl(this.router.url).queryParams,
        page
      }
    });

    // Function to navigate to a specific page using the pagination link URL
    this.fetchProperties(
      {
        ...this.propertyFilter,
        page
      }
    )
  }

  getNumberedLinks(): number[] {
    // Helper function to create an array of page numbers for the numbered links
    const totalPages = this.pagination?.meta?.last_page;
    return Array.from({length: totalPages}, (_, i) => i + 1);
  }

  private transformLocalities(localities: { 'locality': string }[]): void {
    this.locations = localities.reduce((acc: SelectFieldOption[], locality: { 'locality': string }) => {
      if (acc.find((location: any) => location.value === locality.locality)) {
        return acc;
      }
      return [...acc, {label: locality.locality, value: locality.locality}];
    }, [...this.locations] as SelectFieldOption[]);
    this.filterConfig = this.filterConfig?.map(config => {
      if (config.filterField === 'locality') {
        return {
          ...config,
          options: this.locations
        }
      }
      return config;
    })
  }
}
