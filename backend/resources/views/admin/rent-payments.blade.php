@extends('voyager::master')

@section('page_title', 'Rent Payments')

@section('content')

    <div class="card">

        <div class="card-body">
            <div>
                <h4 class="h5 bg-primary" style="padding: 0.5rem">Personal Details</h4>
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <b>Name:</b> {{$tenant->full_name}} <br>
                        <b>Email:</b> {{$tenant->email}}
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <b>Phone:</b> {{$tenant->phone_number}} <br>
                        <b>Home Address:</b> {{$tenant->home_address}}
                    </div>
                </div>
            </div>

            <div>
                <h4 class="h5 bg-primary" style="padding: 0.5rem">Contract Details</h4>
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <b>Commencement Date:</b>
                        @php
                            $date = date_create($tenant->commencement_date);
                            echo date_format($date,"d-m-Y");
                        @endphp <br>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <b>Bank Transfer Reference No:</b> {{$tenant->reference_number}}
                    </div>
                </div>


                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <b>Contract Length:</b> {{$tenant->agreement_duration}} Months <br>
                        <b>Expiry:</b> {{$tenant->expiry_date}} <span
                            style="color:red">({{$tenant->time_left_string}})</span>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <b>Room No:</b> {{$tenant->room_number}} <br>
                        <b>Assigned Property:</b> {{$tenant->property->name}}
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <b>Rent Per Month:</b> {{$tenant->rent_month}} INR <br>
                    <b>Advance Deposit:</b> {{$tenant->deposit}} INR <br>
                </div>
                <div class="col-md-6 col-sm-12">
                    <b>Total Rent Paid Till Now:</b> {{$tenant->total_rent_paid}} INR <br>
                    <b>Balance Till Now:</b> <span style="color:red">{{$tenant->rent_balance}} INR </span>

                </div>
            </div>
            <a href="/admin/tenants/{{$tenant->id}}" class="btn btn-primary">View More Details</a>
            <a href="/admin/tenants/{{$tenant->id}}" onclick="showAddPaymentDialog(event)" class="btn btn-success">Add
                Payment</a>

            <hr>

            <h5 class="h4">Recent Rent Payments</h5>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Amount(INR)</th>
                    <th scope="col">Date</th>
                    <th scope="col">Month/Year</th>
                    <th scope="col">Late Fee</th>
                    <th scope="col">Payment Method</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Confirmation Sent</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                @foreach($tenant->rentPayments as $key => $payment)
                    <tr>
                        <th scope="row">{{$payment->id}}</th>
                        <td>{{$payment->amount}}</td>
                        <td>{{$payment->date->format('d/m/Y')}}

                        </td>
                        <td>{{$payment->date->format('M')}}/{{$payment->date->format('y')}}</td>
                        <td>{{$payment->late_fee ?? 'Nil'}}</td>
                        <td>{{$payment->payment_method}}</td>
                        <td>{{$payment->created_at->format('d/m/Y h:m A')}}</td>
                        <td>{{$payment->confirmation_sent_date?->format('d/m/Y h:m A') ?? 'Not Sent'}}</td>
                        <td>
                            <button type="button" class="btn btn-primary btn-sm mr-1"
                                    onclick="sendConfirmation(event,{{$payment->id}})">Send Confirmation
                            </button>
                            <button type="button" class="btn btn-danger btn-sm"
                                    onclick="deleteRentPayment(event,{{$payment->id}})">Delete
                            </button>
                        </td>
                    </tr>
                @endforeach

                </tbody>
            </table>
        </div>
    </div>
@endsection

<?php
$csrfInput = csrf_field();
$addPaymentForm = '<form method="post" action="/admin/tenants/' . $tenant->id . '/add-payment">
    ' . $csrfInput . '
  <div class="form-group">
    <label for="amount">Rent Amount</label>
    <input type="number" class="form-control" step="any" name="amount" value="' . $tenant->rent_month . '"  placeholder="Enter rent amount in GBP" required>
  </div>
  <div class="form-group">
    <label for="date">Date</label>
    <input type="date" class="form-control" name="date" value="' . now()->format('Y-m-d') . '" placeholder="Date" required>
  </div>
   <div class="form-group">
    <label for="amount">Payment Mode</label>
  <select class="form-select form-control" name="payment_method" required>
  <option value="bank_transfer" selected>Bank Transfer</option>
  <option value="cash">Cash</option>
</select>
  </div>

    <div class="form-group">
    <label for="amount">Late Fee</label>
    <input type="number" class="form-control" step="any" name="late_fee" value="0"  placeholder="Late Fee" required>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>';

$cleaned_form = str_replace(array("\r", "\n"), '', $addPaymentForm);
?>

@section('javascript')
    <script>
        function sendConfirmation(event, id) {
            event.preventDefault();
            event.stopPropagation();
            Swal.fire({
                title: 'Are you sure you want to send confirmation email?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                showLoaderOnConfirm: true,
                preConfirm: (login) => {
                    return fetch('/admin/tenants/rent-payment-confirmation/' + id)
                        .then(response => {
                            if (response.status == 200) {
                                Swal.fire(
                                    'Confirmation Sent!',
                                    'Confirmation email has been sent to tenant.',
                                    'success'
                                ).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.reload();
                                    }
                                });
                            }
                            if (!response.ok) {
                                throw new Error(response.statusText)
                            }
                            return response.json()
                        })
                        .catch(error => {
                            Swal.showValidationMessage(
                                `Request failed: ${error}`
                            )
                        })
                },
                allowOutsideClick: () => !Swal.isLoading()
            });

        }


        function showAddPaymentDialog(event) {
            event.preventDefault();
            event.stopPropagation();

            Swal.fire({
                title: 'Add Payment',
                html: '{!! $cleaned_form !!}',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                showConfirmButton: false,
                cancelButtonText: 'Cancel'
            });
        }


        function deleteRentPayment(event, id) {
            event.preventDefault();
            event.stopPropagation();
            Swal.fire({
                title: 'Are you sure?',
                text: "Are you sure you want to delete this rent payment?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // window.location.href = "/admin/tenants/rent-payment-delete/"+id;

                    $.ajax({
                        url: "/admin/tenant/rent-payment-delete/" + id,
                        type: 'POST',
                        data: {
                            "_token": "{{ csrf_token() }}",
                        },
                        success: function (result) {
                            Swal.fire(
                                'Deleted!',
                                'Rent payment has been deleted.',
                                'success'
                            ).then((result) => {
                                console.log(result);
                                if (result.isConfirmed) {
                                    window.location.reload();
                                }
                            });
                        },
                        error: function (result) {
                            Swal.fire(
                                'Error!',
                                'Something went wrong.',
                                'error'
                            );
                            window.location.reload();
                        }
                    });
                } else if (result.isDenied) {
                }

            });
        }
    </script>
@endsection


