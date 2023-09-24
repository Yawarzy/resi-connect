import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {LightGallerySettings} from "lightgallery/lg-settings";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LightGallery} from "lightgallery/lightgallery";
import lgZoom from 'lightgallery/plugins/zoom';
import {ActivatedRoute} from "@angular/router";
import {RepairsService} from "../../../tenant-dashboard/data-access/repairs.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {InitDetail} from "lightgallery/lg-events";
import {AppUtil} from "../../../app-util";
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";

@Component({
  selector: 'app-approve-repair',
  templateUrl: './approve-repair.component.html',
  styleUrls: ['./approve-repair.component.scss']
})
export class ApproveRepairComponent implements OnInit, AfterViewChecked {
  invalidLink: boolean | undefined;
  item: any;
  files: any[] = [];
  baseUrl = environment.baseUrl;
  settings: LightGallerySettings = {
    counter: false,
    plugins: [lgZoom],
    width: '200px',
  };
  loading: boolean | undefined;
  isApproved: boolean | undefined
  form = new FormGroup({
    contractor_approve_slug: new FormControl(''),
    contractor_job_cost: new FormControl(0, [Validators.required]),
    contractor_approved: new FormControl(false),
    contractor_rating: new FormControl(3, [Validators.required]),
    contractor_feedback: new FormControl('', [Validators.required]),
  });

  radioOptions: any[] = [
    {
      label: 'Terrible',
      value: 1,
    },
    {
      label: 'Bad',
      value: 2,
    },
    {
      label: 'Neutral',
      value: 3,
    },
    {
      label: 'Good',
      value: 4,
    },
    {
      label: 'Excellent',
      value: 5,
    },
  ];

  @ViewChild('lightgallery') lightGallery: LightGallery | undefined;

  constructor(
    private route: ActivatedRoute,
    private repairService: RepairsService,
    private alertService: NzNotificationService
  ) {
    this.route.params.subscribe((params) => {
      if (params['slug']) {
        this.repairService
          .getRepairByContractorApproveSlug(params['slug'])
          .subscribe(
            (data: any) => {
              this.invalidLink = false;
              this.item = data;
              this.files = JSON.parse(data.files);
              this.form.patchValue({
                contractor_approve_slug: params['slug'],
              });
            },
            (error) => {
              console.error(error);
              this.handleInvalidLink();
            }
          );
      } else {
        this.handleInvalidLink();
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.lightGallery?.refresh();
  }

  onFormSubmit(): void {
    this.form.controls.contractor_approved.setValue(true);
    this.loading = true;
    this.repairService.contractorApproveRepair(this.form.value, (res) => {
      this.loading = false;
      if (res.message === 'success') {
        this.invalidLink = false;
        this.isApproved = true;
      } else {
        this.alertService.error('Error', 'Something went wrong');
      }
    }, (err) => {
      this.loading = false;
      this.alertService.error('Error', 'Something went wrong');
    });
  }

  galleryOnInit = (detail: InitDetail): void => {
    this.lightGallery = detail.instance;
  };

  private handleInvalidLink(): void {
    this.invalidLink = true;
  }

  protected readonly AppUtil = AppUtil;
  psConfig: PerfectScrollbarConfigInterface = {
    suppressScrollY: true,
    suppressScrollX: false
  };
  protected readonly toolbar = toolbar;
}
