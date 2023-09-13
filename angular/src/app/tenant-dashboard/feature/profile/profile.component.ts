import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TenantService} from "../../data-access/tenant.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  tenant: any;
  profileForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    full_name: new FormControl('', [Validators.required]),
    date_of_birth: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required]),
    alternate_phone_number: new FormControl(''),
    home_address: new FormControl('', [Validators.required]),
  });
  passwordForm: FormGroup = new FormGroup({
    current_password: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required]),
  });
  editMode: any;

  constructor(private tenantService: TenantService, private notificationService: NzNotificationService) {
  }

  ngOnInit(): void {
    this.tenant = JSON.parse(localStorage.getItem('currentTenant') || '{}');
    this.profileForm.patchValue({
      id: this.tenant.id,
      full_name: this.tenant.full_name,
      date_of_birth: this.tenant.date_of_birth,
      email: this.tenant.email,
      phone_number: this.tenant.phone_number,
      alternate_phone_number: this.tenant.alternate_phone_number,
      home_address: this.tenant.home_address,
    });
  }

  handleSave() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.tenantService.updateItem(this.profileForm.value, (res) => {
        localStorage.setItem('currentTenant', JSON.stringify(res.tenant));
        this.notificationService.success('Profile Updated', 'Your profile has been updated successfully');
      }, (err) => {
        this.notificationService.error('Error', 'An error occurred while updating your profile');
        console.error(err);
      }, false);
    }
  }

  handleChangePassword() {
    const payload = {
      id: this.tenant.user_id,
      current_password: this.passwordForm.value.current_password,
      new_password: this.passwordForm.value.new_password,
    }

    this.tenantService.changePassword(payload, (res: any) => {
      this.notificationService.success('Password Changed', 'Your password has been changed successfully');
      this.passwordForm.reset();
    }, (err: any) => {
      this.notificationService.error('Error', 'An error occurred while changing your password');
      console.error(err);
    });
  }
}
