import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {PropertiesService, Property} from "../../data-access/properties.service";
import {AppUtil} from "../../../app-util";


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {

  property: Property | undefined;

  @ViewChild('lightgallery') lightGallery: ElementRef | undefined

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


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  next() {
    const width = this.lightGallery?.nativeElement.offsetWidth;
    const scrollLeft = this.lightGallery?.nativeElement.scrollLeft;
    this.lightGallery?.nativeElement.scrollTo({
      left: scrollLeft + width,
      behavior: 'smooth'
    });
  }

  prev() {
    const width = this.lightGallery?.nativeElement.offsetWidth;
    const scrollLeft = this.lightGallery?.nativeElement.scrollLeft;
    this.lightGallery?.nativeElement.scrollTo({
      left: scrollLeft - width,
      behavior: 'smooth'
    });
  }
}
