<?php

namespace App\Http\Controllers;

use App\Models\Landlord;
use App\Models\Problem;
use App\Models\RepairCategory;
use App\Models\RepairRequest;
use App\Models\Tenant;
use App\Notifications\ContractorAssignRepairRequestNotification;
use App\Notifications\LandlordRepairRequestReceivedNotification;
use App\Notifications\TenantRepairRequestApprovedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class RepairRequestController extends Controller
{
    public function store(Request $request)
    {
        $validatedRequest = $request->validate([
            'property_id' => 'required|integer',
            'tenant_id' => 'required|integer',
            'repair_category_id' => 'required',
            'repair_problem_id' => 'required',
            'problem_description' => 'required|string',
            'files' => 'required',
            'files*' => 'image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $tenant = Tenant::find($validatedRequest['tenant_id']);
        $repair_category = RepairCategory::find($validatedRequest['repair_category_id']);
        $repair_problem = Problem::find($validatedRequest['repair_problem_id']);

        // assign calculated values
        $validatedRequest['room_number'] = $tenant->room_number;
        $validatedRequest['contractor_id'] = $repair_category->contractor_id;

        // generate slugs
        $validatedRequest['admin_approve_slug'] = Str::random(64);
        $validatedRequest['tenant_approve_slug'] = Str::random(64);
        $validatedRequest['contractor_approve_slug'] = Str::random(64);

        // problem breadcrumb
        $validatedRequest['problem_breadcrumb'] = $repair_category->title . ' > ' . $repair_problem->title;


        // handle file uploads
        if ($request->hasFile('files')) {
            $files = $request->file('files');
            $filePathObj = [];
            foreach ($files as $file) {
                $fileExtension = $file->getClientOriginalExtension();
                $randomString = Str::random(10);


                $fileName = "Photo-" . $tenant->full_name . '-' . date("d-m-Y") . $randomString . '.' . $fileExtension;
                $storage_path = 'repair-photos' . '/' . date("Y");
                Storage::disk('local')->putFileAs('public/' . $storage_path, $file, $fileName);
                // store the path in filePathObj array (only path, like "["properties\/August2023\/hMFu0kVczJ3CN94zDl9j.jpg","properties\/August2023\/octX3DOaU2LMzsCCNBGb.jpg"]")
                array_push($filePathObj, $storage_path . '/' . $fileName);
            }
        }


        $repair = RepairRequest::create([
            'property_id' => $validatedRequest['property_id'],
            'tenant_id' => $validatedRequest['tenant_id'],
            'contractor_id' => $validatedRequest['contractor_id'],
            'problem_description' => $validatedRequest['problem_description'],
            'problem_breadcrumb' => $validatedRequest['problem_breadcrumb'],
            'room_no' => $validatedRequest['room_number'],
            'files' => json_encode($filePathObj),
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

    public function landlordApproveRepair(Request $request, RepairRequest $repairRequest) {
        $approved = $request->approved === '1';
        $repairRequest->approved_by_admin = $approved;
        $repairRequest->save();

        $repairRequest->tenant->notify(new TenantRepairRequestApprovedNotification($repairRequest));

        if ($approved) {
            $repairRequest->contractor->notify(new ContractorAssignRepairRequestNotification($repairRequest));
        }

        $message = '';
        $alert = '';
        if ($approved) {
            $message = 'Request approved successfully';
            $alert = 'success';
        } else {
            $message = 'Request rejected';
            $alert = 'error';
        }
        return redirect()->route('voyager.repair-requests.index')->with([
            'message' => $message,
            'alert-type' => $alert,
        ]);
    }

    public function contractorViewRepair($slug) {
        $rr = RepairRequest::where('contractor_approve_slug', $slug)->where('contractor_approved', 0)->with('property')->firstOrFail();
        return $rr;
    }

    public function contractorApproveRepair(Request $request) {

        $validated_request = $request->validate([
            'contractor_approve_slug'  => 'required|string',
            'contractor_approved' => 'required|boolean',
            'contractor_rating' => 'required|int|min:1|max:5',
            'contractor_feedback' => 'required|string',
            'contractor_job_cost' => 'required|int'
        ]);



        $repairRequest = RepairRequest::where('contractor_approve_slug', $validated_request['contractor_approve_slug'])->where('approved_by_admin', 1)->firstOrFail();
        $repairRequest->contractor_approved = $validated_request['contractor_approved'];
        $repairRequest->contractor_rating = $validated_request['contractor_rating'];
        $repairRequest->contractor_feedback = $validated_request['contractor_feedback'];
        $repairRequest->contractor_job_cost = $validated_request['contractor_job_cost'];
        $repairRequest->update();
        //TODO: notify tenant again that contractor has finished the repair request and ask for their confirmation and feedback
        // TODO: notify admin that contractor has finished the repair request
        return [
            'message' => 'success'
        ];
    }
}
