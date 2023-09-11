import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppUtil} from "../../../app-util";
import {PropertiesService, Property} from "../../../properties/data-access/properties.service";

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {
  tenant: any;
  form: FormGroup = new FormGroup({
    full_name: new FormControl('', [Validators.required]),
    date_of_birth: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required]),
    alternate_phone_number: new FormControl(''),
    home_address: new FormControl('', [Validators.required]),
  })
  signedContract: string | undefined;
  property: Property | undefined;


  constructor(private propertiesService: PropertiesService) {
  }

  ngOnInit(): void {
    this.tenant = JSON.parse(localStorage.getItem('currentTenant') || '{}')[0];

    // update form values
    this.form.patchValue({
      full_name: this.tenant.full_name,
      date_of_birth: this.tenant.date_of_birth,
      email: this.tenant.email,
      phone_number: this.tenant.phone_number,
      alternate_phone_number: this.tenant.alternate_phone_number,
      home_address: this.tenant.home_address,
    })

    this.signedContract = JSON.parse(this.tenant.signed_contract || '{}')[0].download_link;

    this.propertiesService.fetchItem(this.tenant.property_id, (data: { property: Property }) => {
      this.property = {
        ...data.property,
        photos: JSON.parse(data.property.photos as any)
      };
    }, (error: any) => {
      console.log(error);
    });
  }


  addMonthsToDate(date: Date, months: number) {
    const parsedDate = new Date(date);
    const d = parsedDate.getDate();
    parsedDate.setMonth(parsedDate.getMonth() + +months);
    if (parsedDate.getDate() != d) {
      parsedDate.setDate(0);
    }
    return parsedDate;
  }

  protected readonly AppUtil = AppUtil;
}
