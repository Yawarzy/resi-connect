
@component('mail::message')
Dear {{ $tenant->full_name }},

<p>
We hope this email finds you well. We are writing to remind you that your rent {!!  $tenant->owesMoreThanOneMonthRent() ? '': 'for <b>'.now()->format('F/Y').'</b>'!!} in the amount of <b>{{$tenant->rent_balance}} INR</b> is now due. Please make your payment as soon as possible to avoid any late fees.
</p>

<p>
Please make sure to transfer the rent on or before the <b> {{$tenant->commencement_date->format('jS')}}</b> of every month.
</p>


<p>
You can make your payment via bank transfer using the following account details:

</p>
@include('mail.tenant.bankdetailtable')
<br>

<p>
Please make sure to use the reference number: <b>{{ $tenant->reference_number }}</b> provided in the details as it will be used to track your payments.
</p>

<p>
<b>
Additionally, please note that you should receive a rent confirmation within 2 days of making the payment. If you do not receive the confirmation, kindly contact us.
</b>
</p>

<p>
If you have any questions or concerns, please do not hesitate to reach out to us.

</p>
<p>
Thank you for your timely payments.
</p>

Management Team
Resiconnect
@endcomponent
