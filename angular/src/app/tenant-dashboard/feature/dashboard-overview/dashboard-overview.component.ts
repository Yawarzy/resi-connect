import {Component, OnInit} from '@angular/core';
import {AppUtil} from "../../../app-util";
import {PropertiesService, Property} from "../../../properties/data-access/properties.service";

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit {
  tenant: any;
  signedContract: string | undefined;
  property: Property | undefined;
  overDueBy: number = 0;
  advanceBy: number = 0;

  constructor(private propertiesService: PropertiesService) {
  }

  ngOnInit(): void {
    this.tenant = JSON.parse(localStorage.getItem('currentTenant') || '{}');

    this.signedContract = JSON.parse(this.tenant.signed_contract || '{}')[0].download_link;

    this.overDueBy = (this.tenant.rent_balance / this.tenant.ppm) - 1;
    if (this.tenant.rent_balance < 0) {
      this.overDueBy = 0;
      this.advanceBy = Math.abs(this.tenant.rent_balance / this.tenant.ppm);
    }

    this.propertiesService.fetchItem(this.tenant.property_id, (data: { property: Property }) => {
      this.property = {
        ...data.property,
        photos: JSON.parse(data.property.photos as any)
      };
    }, (error: any) => {
      console.log(error);
    });
  }

  protected readonly AppUtil = AppUtil;
}
