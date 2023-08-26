import {Injectable} from '@angular/core';
import {BaseCrudService} from "../../shared/data-access/base-crud.service";
import {Enquiry} from "../util";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnquiryService extends BaseCrudService<Enquiry> {
  baseUrl = environment.baseUrl + '/api/enquiries';

  constructor(public override http: HttpClient) {
    super(http)
  }

  isContractSigned(slug: string) {
    return this.http.post(this.baseUrl + '/is-contract-signed', {slug});
  }

  uploadContract(formData: FormData, headers: HttpHeaders) {
    return this.http.post(this.baseUrl + '/upload-contract', formData, {headers});
  }
}
