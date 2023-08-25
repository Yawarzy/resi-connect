import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EnquiryService} from "../../data-access/enquiry.service";
import {HttpHeaders} from "@angular/common/http";
import {PropertiesService, Property} from "../../../properties/data-access/properties.service";

@Component({
  selector: 'app-enquiry-form',
  templateUrl: './enquiry-form.component.html',
  styleUrls: ['./enquiry-form.component.scss']
})
export class EnquiryFormComponent implements OnInit {

  enquiryForm: FormGroup = new FormGroup({
    property_id: new FormControl('', [Validators.required]),
    full_name: new FormControl('', [Validators.required]),
    date_of_birth: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required]),
    alternate_phone_number: new FormControl(''),
    home_address: new FormControl('', [Validators.required]),
    id_proof: new FormControl('', [Validators.required]),
    address_proof: new FormControl('', [Validators.required]),
  })
  selectedFiles: Record<string, File | null> = {
    id_proof: null,
    address_proof: null
  }
  loading: boolean = false;
  success: boolean | null = null;
  properties: Property[] | undefined;

  constructor(private enquiryService: EnquiryService, private propertiesService: PropertiesService) {
  }

  ngOnInit(): void {
    this.propertiesService.fetchItems((res) => {
      this.properties = res.properties;
    }, (err) => {
      console.error(err)
    });
  }

  handleSubmit() {
    // check if any form control is invalid then mark all as touched and dirty
    if (this.enquiryForm.invalid) {
      Object.keys(this.enquiryForm.controls).forEach(key => {
        this.enquiryForm.controls[key].markAsTouched();
        this.enquiryForm.controls[key].markAsDirty();
      });
      return;
    }

    this.loading = true;

    const formData = new FormData();

    Object.keys(this.enquiryForm.controls).forEach(key => {
      formData.append(key, this.enquiryForm.controls[key].value);
      if (key === 'date_of_birth') {
        formData.set(key, new Date(this.enquiryForm.controls[key].value).toISOString())
      }
    });

    Object.keys(this.selectedFiles).forEach(key => {
      const file: File | null = this.selectedFiles[key];
      if (file) {
        formData.append(key, file);
      }
    });

    const headers = new HttpHeaders({
      'Accept': 'application/json',
    });

    this.enquiryService.addItem(formData, (res) => {
      console.log(res)
      setTimeout(() => {
        this.enquiryForm.reset();
        this.selectedFiles = {
          id_proof: null,
          address_proof: null
        }
        this.loading = false;
        this.success = true;
      }, 3000)
    }, (err) => {
      console.log(err)
      setTimeout(() => {
        this.loading = false;
        this.success = false;
      }, 3000)
    }, headers);
  }

  onFileChange(event: any, controlName: string) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.enquiryForm.patchValue({
        [controlName]: file.name
      });

      this.selectedFiles[controlName] = file; // Store the File object
    }


    console.log(this.selectedFiles)
  }

}
