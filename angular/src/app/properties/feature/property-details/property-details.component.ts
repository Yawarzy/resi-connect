import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {PropertiesService, Property} from "../../data-access/properties.service";
import {AppUtil} from "../../../app-util";
import {LightGallerySettings} from "lightgallery/lg-settings";
import lgZoom from 'lightgallery/plugins/zoom';
import {LightGallery} from "lightgallery/lightgallery";
import {InitDetail} from "lightgallery/lg-events";


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit, AfterViewChecked {

  property: Property | undefined;

  settings: LightGallerySettings = {
    counter: false,
    plugins: [lgZoom],
    width: '200px',
  };

  @ViewChild('lightgallery') lightGallery: LightGallery | undefined

  private subscription: Subscription | undefined;
  protected readonly AppUtil = AppUtil;

  constructor(private activatedRoute: ActivatedRoute, private propertiesService: PropertiesService) {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.propertiesService.fetchItem(id, (data: { property: Property }) => {
        this.property = {
          ...data.property,
          photos: JSON.parse(data.property.photos as any)
        };
      }, (error: any) => {
        console.log(error);
      });
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.lightGallery?.refresh();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  galleryOnInit = (detail: InitDetail): void => {
    this.lightGallery = detail.instance;
  }
}
