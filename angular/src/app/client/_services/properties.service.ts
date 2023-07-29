import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

export type PropertyType = 'apartment' | 'house';

export interface Property {
  id: number;
  name: string;
  locality: string;
  city: string;
  full_address: string;
  type: PropertyType,
  bedrooms: number;
  bathrooms: number;
  storeys: number;
  is_furnished: boolean;
  has_parking: boolean;
  is_available: boolean;
  is_pg: boolean;
  minimum_lease_period: number;
  deposit: number;
  ppm: number;
  photos: string[] | string;
}

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public getProperties(success: any, error: any, params?: any) {
    this.http.get<{
      'properties': Property[]
    }>(`${this.baseUrl}/api/properties`, {params: params}).subscribe((response) => {
      response.properties = response.properties.map((property: any) => {
        return {
          ...property,
          photos: property.photos.slice(1, -1).split(',')
        }
      });
      success(response);
    }, err => {
      error(err);
    });
  }

  // public getFilteredProperties(filters: any, success: any, error: any) {
  //   this.http.get<any>(`${this.baseUrl}/api/properties`, {params: filters}).subscribe(data => {
  //     console.log(data);
  //     success(data);
  //   }, err => {
  //     error(err);
  //   });
  // }
}
