<?php

namespace App\Http\Controllers;

use App\Models\Landlord;
use App\Models\RepairRequest;
use App\Models\Tenant;
use App\Notifications\LandlordRepairRequestReceivedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RepairRequestController extends Controller
{
    public function store(Request $request)
    {
        $validatedRequest = $request->validate([
            'property_id' => 'required|integer',
            'tenant_id' => 'required|integer',
            'problem_description' => 'required|string',
//            'files' => 'required',
//            'files*' => 'image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $tenant = Tenant::find($validatedRequest['tenant_id']);
        if (!$tenant) {
            return response()->json([
                'message' => 'Tenant not found'
            ], 404);
        }

        $validatedRequest['room_number'] = $tenant->room_number;

        // generate slugs
        $validatedRequest['admin_approve_slug'] = Str::random(64);
        $validatedRequest['tenant_approve_slug'] = Str::random(64);
        $validatedRequest['contractor_approve_slug'] = Str::random(64);
        $validatedRequest['contractor_id'] = 1;

        $repair = RepairRequest::create([
            'property_id' => $validatedRequest['property_id'],
            'tenant_id' => $validatedRequest['tenant_id'],
            'contractor_id' => $validatedRequest['contractor_id'],
            'problem_description' => $validatedRequest['problem_description'],
            'room_no' => $validatedRequest['room_number'],
            'files' => json_encode($validatedRequest['files'] ?? []),
            'admin_approve_slug' => $validatedRequest['admin_approve_slug'],
            'tenant_approve_slug' => $validatedRequest['tenant_approve_slug'],
            'contractor_approve_slug' => $validatedRequest['contractor_approve_slug'],
        ]);

        if ($repair) {
            $landlord_id = $repair->property->landlord_id;
            $landlord = Landlord::where('id', $landlord_id)->first();
            $landlord->notify(new LandlordRepairRequestReceivedNotification($repair));

            return response()->json([
                'message' => 'Repair request created successfully',
                'repair' => $repair
            ], 201);
        } else {
            abort(500, 'Something went wrong while storing the data');
        }

    }
}
