import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PropertiesService, Property} from "../../../properties/data-access/properties.service";
import {RepairCategory, RepairProblem, RepairsService} from "../../data-access/repairs.service";
import {Tenant} from "../../data-access/tenant.service";
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.scss']
})
export class RepairsComponent implements OnInit {
  tenant: Tenant | undefined;

  repairCategories: RepairCategory[] = [];
  selectedProperty: Property | undefined;
  selectedCategory: RepairCategory | undefined;
  selectedProblem: string | undefined;
  problems: RepairProblem[] = [];

  current = 0;
  loading = false;
  success: boolean | null = null;

  repairRequestForm = new FormGroup({
    tenant_id: new FormControl('', [Validators.required]),
    property_id: new FormControl('', [Validators.required]),
    repair_category_id: new FormControl('', [Validators.required]),
    repair_problem_id: new FormControl('', [Validators.required]),
    problem_description: new FormControl('', [Validators.required]),
    files: new FormGroup({
      photos: new FormControl<File[]>([], [Validators.required]),
    })
  })

  isDialogVisible = false;
  dialogTitle = 'Emergency Contact';
  dialogContent: any;
  psConfig: PerfectScrollbarConfigInterface = {
    suppressScrollY: true
  };
  isVisible = false;
  confirmForm = new FormGroup({
    tenant_approve_slug: new FormControl('', [Validators.required]),
    tenant_approved: new FormControl(false, [Validators.requiredTrue]),
    tenant_rating: new FormControl(3, [Validators.required]),
    tenant_feedback: new FormControl('', [Validators.required])
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
  ]
  tenantRepairRequests: any[] = [];

  constructor(private propertiesService: PropertiesService, private repairsService: RepairsService, private notificationService: NzNotificationService) {
  }

  ngOnInit(): void {
    this.tenant = JSON.parse(localStorage.getItem('currentTenant') || '{}');
    this.repairRequestForm.patchValue({
      tenant_id: this.tenant!.id as any
    });

    this.propertiesService.fetchItem(this.tenant!.property_id, (data: { property: Property }) => {
      this.selectedProperty = {
        ...data.property,
        photos: JSON.parse(data.property.photos as any)
      };
      this.repairRequestForm.patchValue({
        property_id: this.selectedProperty.id as any
      });
    }, (error: any) => {
      console.error(error);
    });

    this.repairsService.getRepairCategories((res: any) => {
      this.repairCategories = res;
    }, (err: any) => {
      console.error(err);
    });

    this.getTenantRepairs();
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    if (this.current === 0) {
      if (this.repairRequestForm.get('property_id')?.valid) {
        this.current += 1;
        return;
      }

      this.repairRequestForm.get('property_id')?.markAsDirty();
      this.repairRequestForm.get('property_id')?.markAsTouched();
      return;
    }

    if (this.current === 1) {
      if (this.repairRequestForm.controls.problem_description.invalid) {
        this.repairRequestForm.controls.problem_description.markAsDirty();
        this.repairRequestForm.controls.problem_description.markAsTouched();
        return;
      }

      this.current += 1;
    }
  }

  done(): void {
    if (this.repairRequestForm.controls.files.controls.photos.invalid) {
      this.repairRequestForm.controls.files.controls.photos.markAsDirty();
      this.repairRequestForm.controls.files.controls.photos.markAsTouched();
      return;
    }

    this.handleSubmit();
  }

  selectCategory(category: RepairCategory) {
    this.selectedCategory = category;
    this.repairRequestForm.patchValue({
      repair_category_id: category.id.toString()
    });
    this.problems = category.problems;
  }

  selectProblem(problem: RepairProblem) {
    this.repairRequestForm.patchValue({
        repair_problem_id: problem.id.toString()
    });
    this.selectedProblem = problem.title;
    if (problem.is_emergency) {
      this.isDialogVisible = true;
      this.dialogContent = problem.dialog_content;
    }
  }

  resetToDefault() {
    this.repairRequestForm.controls.repair_problem_id.reset();
    this.selectedProblem = undefined;
    this.selectedCategory = undefined;
    this.problems = [];
  }

  handleDialog() {
    this.isDialogVisible = false;
  }

  onPhotosChange(event: any) {
    if (event.target.files.length < 2 ) {
      this.repairRequestForm.controls.files.controls.photos.setErrors({minFiles: true});
      return;
    }
    this.repairRequestForm.controls.files.controls.photos.setErrors(null);

    const files: File[] = event.target.files;
    this.repairRequestForm.patchValue({
      files: {
        photos: files
      }
    });
  }

  private handleSubmit() {
    this.loading = true;
    this.repairsService.addRepairRequest(this.repairRequestForm.value, (res: any) => {
      this.loading = false;
      this.success = true;
      this.repairRequestForm.reset();
      this.resetToDefault();
    }, (err: any) => {
      this.loading = false;
      this.success = false;
    });
  }

  handleCancel() {
    this.isVisible = false;
  }

  confirmTenantRepair() {
    this.confirmForm.patchValue({
      tenant_approved: true
    });
    this.repairsService.tenantApproveRepair(this.confirmForm.value, (res: any) => {
      this.isVisible = false;
      this.confirmForm.reset();
      this.notificationService.success('Success', 'Repair confirmed!!');
      this.getTenantRepairs();
    }, (err: any) => {
      console.error(err);
      this.notificationService.error('Error', 'Something went wrong!!');
    });
  }

  getStatus(rr: any) {
    if (rr.tenant_approved === '1' && rr.approved_by_admin === '1' && rr.contractor_approved === '1') {
      return 'Completed';
    }

    if (rr.contractor_approved === '1' && rr.approved_by_admin === '1') {
      return 'Contractor Approved';
    }

    if (rr.contractor_approved === '0' && rr.approved_by_admin === '1') {
      return 'In Progress';
    }

    if (rr.rejected_by_admin === '1') {
      return 'Rejected';
    }

    if (rr.approved_by_admin === '0') {
      return 'Pending'
    }

    if (rr.approved_by_admin === '1') {
      return 'Approved';
    }

    return 'Pending';
  }

  public getRating(rating: number) {
    if (rating === 1) {
      return 'Terrible';
    }

    if (rating === 2) {
      return 'Bad';
    }

    if (rating === 3) {
      return 'Neutral';
    }

    if (rating === 4) {
      return 'Good';
    }

    if (rating === 5) {
      return 'Excellent';
    }

    return 'N/A';
  }


  private getTenantRepairs() {
    this.repairsService.getAllRepairRequests(this.tenant!.id, (res: any) => {
      this.tenantRepairRequests = res.repairRequests;
      this.confirmForm.patchValue({
        tenant_approve_slug: this.tenantRepairRequests[0]?.tenant_approve_slug
      });
    }, (err: any) => {
      console.error(err);
    });
  }
}
