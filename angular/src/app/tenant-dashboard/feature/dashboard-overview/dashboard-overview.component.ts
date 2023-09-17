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


  constructor(private propertiesService: PropertiesService) {
  }

  ngOnInit(): void {
    this.tenant = JSON.parse(localStorage.getItem('currentTenant') || '{}');

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

  protected readonly AppUtil = AppUtil;
}
