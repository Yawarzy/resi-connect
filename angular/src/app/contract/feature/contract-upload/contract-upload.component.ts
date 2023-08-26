import {Component, OnDestroy, OnInit} from '@angular/core';
import {EnquiryService} from "../../../enquiry/data-access/enquiry.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-contract-upload',
  templateUrl: './contract-upload.component.html',
  styleUrls: ['./contract-upload.component.scss']
})
export class ContractUploadComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = []
  contractSigned: boolean = false;
  expiredLink: boolean = false;
  selectedFile: File | null = null;
  loading: boolean = false;
  success: boolean | null = null;

  form = new FormGroup(
    {
      signed_contract: new FormControl(null, [Validators.required])
    }
  )

  constructor(private enquiryService: EnquiryService, private activatedRoute: ActivatedRoute) {
    this.subscriptions.push(
      this.activatedRoute.params.pipe(
        switchMap((params) => {
          return this.enquiryService.isContractSigned(params['slug']);
        })
      ).subscribe((res) => {
        this.contractSigned = (res as any)['contract_signed'];
        this.expiredLink = this.contractSigned;
      })
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  handleSubmit() {
    if (this.form.invalid) {
      this.form.controls['signed_contract'].markAsTouched();
      this.form.controls['signed_contract'].markAsDirty();
      return;
    }

    // check if file is pdf
    if (this.selectedFile?.type !== 'application/pdf') {
      this.form.controls['signed_contract'].setErrors({invalid: true});
      this.form.controls['signed_contract'].markAsTouched();
      this.form.controls['signed_contract'].markAsDirty();
      return;
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('signed_contract', this.selectedFile as File);
    formData.append('slug', this.activatedRoute.snapshot.params['slug']);

    const headers = new HttpHeaders({
      'Accept': 'application/json',
    });

    this.subscriptions.push(this.enquiryService.uploadContract(formData, headers).subscribe((res) => {
        this.contractSigned = true;
        setTimeout(() => {
          this.loading = false;
          this.success = true;
        }, 2000);
      }, (err) => {
        console.error(err);
        setTimeout(() => {
          this.contractSigned = false;
          this.loading = false;
          this.success = false;
        }, 2000);
      })
    );

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('signed_contract')?.setValue(file.name);
      this.selectedFile = file;
    }
  }

}
