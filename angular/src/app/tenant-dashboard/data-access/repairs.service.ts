import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

export interface RepairRequest {

}

export interface RepairProblem {
  id: number;
  repair_category_id: number;
  title: string;
  is_emergency: boolean;
  dialog_content: string | null;
}

export interface RepairCategory {
  id: number;
  contractor_id: number;
  title: string;
  icon: string | null;
  problems: RepairProblem[];
}


@Injectable({
  providedIn: 'root'
})
export class RepairsService {

  baseUrl = environment.baseUrl + '/api';


  constructor(private http: HttpClient) { }

  getRepairCategories(success: (res: any) => void, error: (err: any) => void) {
    this.http.get(`${this.baseUrl}/repair-categories`).subscribe(res => {
      success(res);
    }, (err) => {
      error(err);
    })
  }

  addRepairRequest(repairRequest: any, success: (res: any) => void, error: (err: any) => void) {
    const formData = new FormData();
    Object.keys(repairRequest).forEach((key) => {
      if (key === 'files') {
        const photos: any[] = [...repairRequest.files.photos]
        photos.forEach((file: File) => {
          formData.append('files[]', file);
        });
      } else {
        formData.append(key, repairRequest[key]);
      }
    });


    this.http.post(`${this.baseUrl}/repair-requests`, formData, {
      headers: {
          'Accept': 'application/json',
      }
    }).subscribe(res => {
      success(res);
    }, (err) => {
      error(err);
    })
  }

  getRepairByContractorApproveSlug(slug: string) {
    return this.http.get(`${this.baseUrl}/contractor/repair-request/${slug}`, {
      headers: {
        Accept: 'application/json',
        AcceptControlAllowOrigin: '*'
      }
    });
  }

  contractorApproveRepair(data: any, success: (res: any) => void, error: (err: any) => void) {
    this.http.post(`${this.baseUrl}/contractor/repair-request/approve`, {
      ...data
    }).subscribe(res => {
      success(res);
    }, (err) => {
      console.error(err)
      error(err);
    })
  }

  getAllRepairRequests(tenantId: number, success: (res: any) => void, error: (err: any) => void) {
    this.http.get(`${this.baseUrl}/tenant/repair-requests/${tenantId}`, {
      headers: {
        Accept: 'application/json',
      }
    }).subscribe(res => {
      success(res);
    }, (err) => {
      error(err);
    })
  }

  tenantApproveRepair(data: any, success: (res: any) => void, error: (err: any) => void) {
    this.http.post(`${this.baseUrl}/tenant/repair-request/approve`, {
      ...data
    }).subscribe(res => {
      success(res);
    }, (err) => {
      console.error(err)
      error(err);
    })
  }
}
