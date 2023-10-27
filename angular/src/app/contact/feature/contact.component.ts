import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EnquiryService} from "../../enquiry/data-access/enquiry.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  loading = false;

  contactForm = new FormGroup({
    full_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
    message: new FormControl('', [Validators.required]),
  })

  constructor(private enquiryService: EnquiryService, private notificationService: NzNotificationService) {
  }

  ngOnInit(): void {
  }


  handleSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    this.loading = true;

    this.enquiryService.sendContactEmail(this.contactForm.value).subscribe((res: any) => {
      if (res.success) {
        this.loading = false;
        this.contactForm.reset();
        this.notificationService.success('Success', 'Your message has been sent successfully');
      } else {
        this.loading = false;
        this.notificationService.error('Error', 'Something went wrong');
      }
    }, (err) => {
      this.loading = false;
      this.notificationService.error('Error', 'Something went wrong');
      console.error(err);
    });
  }

}
