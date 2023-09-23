import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PropertiesService, Property} from "../../../properties/data-access/properties.service";
import {RepairCategory, RepairProblem, RepairsService} from "../../data-access/repairs.service";
import {Tenant} from "../../data-access/tenant.service";

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

  current = 1;
  loading = false;
  success: boolean | null = null;

  repairRequestForm = new FormGroup({
    property_id: new FormControl('', [Validators.required]),
    problem: new FormGroup({
      category: new FormControl('', [Validators.required]),
      problem: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
  })

  constructor(private propertiesService: PropertiesService, private repairsService: RepairsService) {
  }

  ngOnInit(): void {
    this.tenant = JSON.parse(localStorage.getItem('currentTenant') || '{}');

    this.propertiesService.fetchItem(this.tenant!.property_id, (data: { property: Property }) => {
      this.selectedProperty = {
        ...data.property,
        photos: JSON.parse(data.property.photos as any)
      };
      this.repairRequestForm.patchValue({
        property_id: this.selectedProperty.id as any
      });
    }, (error: any) => {
      console.log(error);
    });

    this.repairsService.getRepairCategories((res: any) => {
      console.log(res);
      this.repairCategories = res;
    }, (err: any) => {
      console.error(err);
    });
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    if (this.current === 0) {
      console.log(this.repairRequestForm.get('property_id')?.value)
      if (this.repairRequestForm.get('property_id')?.valid) {
        this.current += 1;
        return;
      }

      this.repairRequestForm.get('property_id')?.markAsDirty();
      this.repairRequestForm.get('property_id')?.markAsTouched();
      return;
    }

    if (this.current === 1) {
      if (this.repairRequestForm.controls.problem.controls.description.invalid) {
        this.repairRequestForm.controls.problem.controls.description.markAsDirty();
        this.repairRequestForm.controls.problem.controls.description.markAsTouched();
        return;
      }

      this.current += 1;
    }


    if (this.current === 2) {
      // const controls = ['id_proof', 'address_proof'];
      // let valid = true;
      // for (let control of controls) {
      //   if (this.repairRequestForm.controls?.[control]?.invalid) {
      //     this.repairRequestForm.controls?.[control]?.markAsDirty();
      //     this.repairRequestForm.controls?.[control]?.markAsTouched();
      //     valid = false;
      //   }
      // }
      //
      // if (!valid) {
      //   return;
      // }
    }

    this.current += 1;
  }

  done(): void {
    console.log('done');
    this.handleSubmit();
  }

  private handleSubmit() {

  }

  selectCategory(category: any) {
    this.selectedCategory = category;
    this.repairRequestForm.patchValue({
      problem: {
        category: category.id
      }
    });
    this.problems = category.problems;
  }

  selectProblem(problem: any) {
    this.repairRequestForm.patchValue({
      problem: {
        category: this.repairRequestForm.get('problem.category')?.value,
        problem: problem.title
      }
    });
    this.selectedProblem = problem.title;
    if (problem.is_emergency) {
      this.isDialogVisible = true;
      this.dialogContent = problem.dialog_content;
    }
    console.log(this.repairRequestForm.value)
  }

  protected readonly prompt = prompt;
  isDialogVisible = false;
  dialogTitle = 'Emergency Contact';
  dialogContent: any;

  resetToDefault() {
    this.repairRequestForm.controls['problem'].reset();
    this.selectedProblem = undefined;
    this.selectedCategory = undefined;
    this.problems = [];
  }

  handleDialog() {
    this.isDialogVisible = false;
  }
}
