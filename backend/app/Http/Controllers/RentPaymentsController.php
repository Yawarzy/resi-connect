<?php

namespace App\Http\Controllers;

use App\Models\RentPayments;
use App\Models\Tenant;
use Illuminate\Http\Request;

class RentPaymentsController extends Controller
{
    public function index(Request $request)
    {
        $all_tenants = Tenant::where('is_active', true)->get();
        $tenants = $all_tenants->filter(function ($tenant) {
            return $tenant->rent_balance > 0;
        });

        if ($request->has('search')) {
            $search = $request->search;
            $tenants = $tenants->filter(function ($tenant) use ($search) {
                return stripos($tenant->full_name, $search) !== false || stripos($tenant->property->name, $search) !== false;
            });
        }

        $perPage = 10;
        $currentPage = $request->input('page', 1);
        $pagedData = $tenants->slice(($currentPage - 1) * $perPage, $perPage)->all();
        $tenants = new \Illuminate\Pagination\LengthAwarePaginator($pagedData, count($tenants), $perPage, $currentPage,
            ['path' => $request->url(), 'query' => $request->query()]);

        return view('admin.pending-rents', compact('tenants'));
    }


    public function view(Tenant $tenant)
    {
        $property_id = $tenant->property_id;
        $property = \App\Models\Property::find($property_id);
        $tenant->property = $property;


        return view('admin.rent-payments', compact('tenant'));
    }

    public function addPayment(Request $request, Tenant $tenant)
    {
        $validatedRequest = $request->validate([
            'date' => 'required|date',
            'amount' => 'required|numeric',
            'payment_method' => 'required|in:cash,bank_transfer',
            'late_fee' => 'required|string'
        ]);

        $rent_payment = $tenant->rentPayments()->create($validatedRequest);

        if ($rent_payment) {
            return redirect()->back()->with(['message' => "Rent Added Successfully", 'alert-type' => 'success']);
        } else {
            return redirect()->back()->with(['message' => "Something went wrong", 'alert-type' => 'error']);
        }
    }

    function deletePayment(RentPayments $rentPayment)
    {
        $rentPayment->delete();
        return response()->json(['success' => true]);

    }

    public function sendConfirmation(RentPayments $rentPayment)
    {
        $rentPayment->sendRentConfirmationNotification();
        return response()->json(['success' => true]);
    }

    function sendRentReminder(Tenant $tenant)
    {
        $tenant->sendRentReminderNotification();
        return response()->json(['success' => true]);
    }
}


