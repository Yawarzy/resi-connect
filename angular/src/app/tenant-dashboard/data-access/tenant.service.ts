import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseCrudService} from "../../shared/data-access/base-crud.service";
import {environment} from "../../../environments/environment";

export interface Tenant {
  id: number;
  full_name: string;
  date_of_birth: string;
  email: string;
  phone_number: string;
  alternate_phone_number: string;
  home_address: string;
  property_id: number;
  signed_contract: string;
}

@Injectable({
  providedIn: 'root'
})
export class TenantService extends BaseCrudService<any> {

  baseUrl = environment.baseUrl + '/api/tenant/update';

  constructor(public override http: HttpClient) {
    super(http)
  }

  changePassword(data: any, success: any, error: any) {
    this.http.put(`${environment.baseUrl}/api/tenant/update-password`, data).subscribe(
      (res: any) => {
        success(res);
      },
      (err: any) => {
        error(err);
      }
    );
  }

}
