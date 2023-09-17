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

export interface RentPayment {
  id: number;
  date: string;
  amount: number;
  late_fee: number;
  payment_method: 'cash' | 'bank_transfer';
  reference_number: string;
  confirmation_sent_date: string | null;
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

  getPaymentHistory(id: number, success: (res: any) => void, error: (err: any) => void) {
    this.http.get<{'payments': RentPayment[]}>(`${environment.baseUrl}/api/tenant/payment-history/${id}`).subscribe(
      (res: any) => {
        success(res);
      },
      (err: any) => {
        error(err);
      }
    );
  }

}
