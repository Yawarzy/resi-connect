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
  photos: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public getProperties(success: any, error: any) {
    this.http.get<Property[]>(`${this.baseUrl}/api/properties`).subscribe(properties => {
      success(properties);
    }, err => {
      error(err);
    });
  }
}
