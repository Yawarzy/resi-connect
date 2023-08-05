import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {SelectFieldOption} from "../../form";

type FilterType = 'select' | 'range';

export interface FilterCount {
  totalCount: number;
  filteredCount: number;
}

export interface BaseFilterConfig {
  filterField: string,
  label: string,
  filterType: FilterType
}

export interface SelectFilterConfig extends BaseFilterConfig {
  filterType: 'select',
  options: SelectFieldOption[],
}

export interface RangeFilterConfig extends BaseFilterConfig {
  value: number[],
  step: number,
  min: number,
  max: number
}

export type FilterConfig = SelectFilterConfig | RangeFilterConfig

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() headline: string | undefined;

  @Input() count: FilterCount | undefined;

  @Input() filterConfig: FilterConfig[] | undefined;

  @Output() onApplyFilter = new EventEmitter<any>();

  @Output() onResetFilter = new EventEmitter<any>();

  filteredValues: any | undefined;
  showFilters = false;

  constructor(private router: Router) {
    const queryParams = this.router.parseUrl(this.router.url).queryParams;
    this.filteredValues = {
      ...queryParams
    }
  }

  ngOnInit(): void {
    this.filteredValues = {
      ...this.initFilterValues(),
      ...this.filteredValues
    }
    this.applyFilter();
  }

  applyFilter(): void {
    let flat = this.flattenObject(this.filteredValues);
    // Don't add to query params if default values
    flat = Object.keys(flat).reduce((acc: any, key: string) => {
      if (flat[key] !== 'all' && flat[key] !== 'any') {
        return {
          ...acc,
          [key]: flat[key]
        }
      }
      return acc;
    }, {} as any);
    this.onApplyFilter.emit(flat);
    // Add to query params
    this.router.navigate([], {
      queryParams: {
        ...this.router.parseUrl(this.router.url).queryParams,
        ...flat
      },
      queryParamsHandling: 'merge'
    });

  }

  resetFilter(): void {
    this.filteredValues = this.initFilterValues();
    this.onResetFilter.emit(this.filteredValues);

    // Reset query params
    this.router.navigate([], {
      queryParams: {}
    });
  }

  initFilterValues(): Record<string, any> {
    return this.filterConfig?.reduce((acc, filter) => {
      if (filter.filterType === 'select') {
        acc[filter.filterField] = (filter as SelectFilterConfig).options?.find((option) => option.default)?.value;
      }

      if (filter.filterType === 'range') {
        acc[filter.filterField] = filter.value
      }
      return acc;
    }, {} as any)
  }


  flattenObject(obj: any, parentKey = ''): Record<string, any> {
    let result: any = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (Array.isArray(obj[key]) && obj[key].length === 2) {
            const [first, second] = obj[key];
            result[`min_${newKey}`] = first;
            result[`max_${newKey}`] = second;
          } else {
            const flattenedSubObject = this.flattenObject(obj[key], newKey);
            result = {...result, ...flattenedSubObject};
          }
        } else {
          result[key] = obj[key]; // Add only if it's not an object or is null
        }
      }
    }

    return result;
  }

}
