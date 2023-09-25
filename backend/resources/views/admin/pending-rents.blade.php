@extends('voyager::master')

@section('page_title', __('voyager::generic.viewing').' '.'Pending Rents')

@section('page_header')
    <div class="container-fluid">
        <h1 class="page-title">
            <i class="voyager-credit-cards"></i> Pending Rents
        </h1>
        <a href="{{route('voyager.tenants.index')}}" class="btn btn-warning btn-add-new">
            <i class="voyager-list"></i> <span>View All Tenants</span>
        </a>
    </div>
@stop

@section('content')

    <div class="card">

        <div class="card-body">
            <div class="search-input">
                <form method="get">
                    <div class="row">
                        <div class="col-md-9">
                            <input type="text" name="search" class="form-control"
                                   placeholder="Search by tenant name or property"
                                   value="{{request()->get('search')}}">
                        </div>

                        <div class="col-md-3">
                            <button class="btn btn-primary" style="margin: 0">Search</button>
                            <a href="{{url()->current()}}" class="btn btn-danger" style="margin: 0">Clear</a>
                        </div>
                    </div>
                </form>
            </div>

            <div class="table-responsive">

                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Property</th>
                        <th scope="col">Room</th>
                        <th scope="col">Rent/Month</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Time Left</th>
                        <th scope="col">Last Reminder</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($tenants as $tenant)
                        <tr>
                            <td>{{$tenant->full_name}}</td>
                            <td>{{$tenant->property->name}}</td>
                            <td>{{$tenant->room_number}}</td>
                            <td>{{$tenant->rent_month}}</td>
                            <td>{{$tenant->rent_balance}}</td>
                            <td>{{$tenant->time_left_string}}</td>
                            <td>{{
    $tenant->last_emailed_at ? $tenant->last_emailed_at->diffForHumans() ?? 'Not Sent' : 'Not Sent'
}}</td>
                            <td>
                                <button style="margin: 0" class="btn btn-danger"
                                        onclick="sendRentReminder(event,{{$tenant->id}})">Send
                                    Reminder
                                </button>
                                <a style="margin: 0" href="/admin/tenants/rent-payments/{{$tenant->id}}"
                                   class="btn btn-success">Rent
                                    Payments</a>
                                <a style="margin: 0" href="{{route('voyager.tenants.show', $tenant->id)}}"
                                   class="btn btn-primary">View</a>


                        </tr>
                    @endforeach

                    </tbody>
                </table>

            </div>


            <div class="pagination">
                {{$tenants->links()}}
            </div>


        </div>

        @endsection

        @section('javascript')
            <script>
                function sendRentReminder(event, id) {
                    event.preventDefault();
                    event.stopPropagation();
                    Swal.fire({
                        title: 'Are you sure you want to send a reminder to this tenant?',
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        showLoaderOnConfirm: true,
                        preConfirm: (login) => {
                            return fetch('/admin/tenants/send-rent-reminder/' + id)
                                .then(response => {
                                    if (response.status == 200) {
                                        Swal.fire(
                                            'Reminder Sent!',
                                            'Reminder email has been sent to tenant.',
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


            </script>

@endsection
