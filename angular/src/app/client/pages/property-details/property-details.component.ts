import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {PropertiesService, Property} from "../../_services/properties.service";

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  property: Property | undefined;
  private subscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute, private propertiesService: PropertiesService) {
    // get the id from the url
    this.subscription = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.propertiesService.fetchItem(id, (data: { property: Property }) => {
        this.property = {
          ...data.property,
          photos: JSON.parse(data.property.photos as any)
        };
        console.log(this.property);
      }, (error: any) => {
        console.log(error);
      });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
