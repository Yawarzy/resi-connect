import {Component, OnInit} from '@angular/core';
import {RentPayment, TenantService} from "../../data-access/tenant.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  tenant : any;
  rentPayments: RentPayment[] = [];
  config: PerfectScrollbarConfigInterface = {
    suppressScrollY: true
  };

  constructor(private tenantService: TenantService,  private notificationService: NzNotificationService) { }

  ngOnInit(): void {
    this.tenant = JSON.parse(localStorage.getItem('currentTenant') || '{}');

    this.tenantService.getPaymentHistory(this.tenant.id, (res) => {
      this.rentPayments = res.payments.map((payment: RentPayment) => {
        return {
          ...payment,
          date: new Date(payment.date),
        };
      });
    }, (err) => {
      console.error(err);
      this.notificationService.error('Error', 'An error occurred while fetching your payment history.');
    });
  }
}
