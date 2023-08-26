<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EnquiryController extends Controller
{
    public function index()
    {
        return Enquiry::all();
    }

    public function store(Request $request)
    {
        $validatedRequest = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'full_name' => 'required',
            'date_of_birth' => 'required',
            'email' => 'required|email',
            'phone_number' => 'required|numeric|digits:10',
            'alternate_phone_number' => 'nullable|numeric|digits:10',
            'home_address' => 'required',
            'id_proof' => 'required|file',
            'address_proof' => 'required|file',
        ]);


        if ($request->hasFile('id_proof')) {
            $file = $validatedRequest['id_proof'];
            $fileExtension = $file->getClientOriginalExtension();

            $fileName = "Id-proof-" . $validatedRequest['full_name'] . '-' . date("d-m-Y") . '.' . $fileExtension;
            $storage_path = 'id_proofs' . '/' . date("Y");
            Storage::disk('local')->putFileAs('public/' . $storage_path, $file, $fileName);
            $filePathObj = [[
                'download_link' => $storage_path . '/' . $fileName,
                'original_name' => $fileName
            ]];

            $validatedRequest['id_proof'] = json_encode($filePathObj);
        }

        if ($request->hasFile('address_proof')) {
            $file = $validatedRequest['address_proof'];
            $fileExtension = $file->getClientOriginalExtension();

            $fileName = "Address-proof-" . $validatedRequest['full_name'] . '-' . date("d-m-Y") . '.' . $fileExtension;
            $storage_path = 'address_proofs' . '/' . date("Y");
            Storage::disk('local')->putFileAs('public/' . $storage_path, $file, $fileName);
            $filePathObj = [[
                'download_link' => $storage_path . '/' . $fileName,
                'original_name' => $fileName
            ]];

            $validatedRequest['address_proof'] = json_encode($filePathObj);
        }

        $validatedRequest['date_of_birth'] = date('Y-m-d', strtotime($validatedRequest['date_of_birth']));
        $enquiry = Enquiry::create($validatedRequest);

        // TODO: Send email to Landlord
        $property = Property::find($validatedRequest['property_id']);
        $landlord = $property->landlord;

        $landlord->sendEnquiryReceivedNotifications($enquiry, $landlord);

        return response()->json([
            'message' => 'Enquiry created successfully',
            'enquiry' => $enquiry->makeHidden(['id_proof', 'address_proof', 'created_at', 'updated_at'])
        ], 201);
    }

    public function isContractSigned(Request $request)
    {
        // get slug from request
        $slug = $request->slug;

        // get enquiry from slug
        $enquiry = Enquiry::where('upload_contract_slug', $slug)->first();

        if (!$enquiry) {
            return response()->json([
                'message' => 'Enquiry not found',
                'contract_signed' => true
            ]);
        }

        // check if contract is signed
        if ($enquiry->contract_signed) {
            return response()->json([
                'message' => 'Contract signed',
                'contract_signed' => true
            ]);
        } else {
            return response()->json([
                'message' => 'Contract not signed',
                'contract_signed' => false
            ]);
        }
    }

    public function uploadContract(Request $request)
    {
        $validatedRequest = $request->validate([
            'slug' => 'required',
            'signed_contract' => 'required|file|mimes:pdf'
        ]);
        $slug = $validatedRequest['slug'];
        $enquiry = Enquiry::where('upload_contract_slug', $slug)->first();

        if ($request->hasFile('signed_contract')) {
            $file = $validatedRequest['signed_contract'];
            $fileExtension = $file->getClientOriginalExtension();

            $fileName = "Signed-Contract-" . $enquiry['full_name'] . '-' . date("d-m-Y") . '-' . uniqid() . '.' . $fileExtension;
            $storage_path = 'contracts/signed';
            Storage::disk('local')->putFileAs('public/' . $storage_path, $file, $fileName);
            $filePathObj = [[
                'download_link' => $storage_path . '/' . $fileName,
                'original_name' => $fileName
            ]];

            $enquiry->signed_contract = json_encode($filePathObj);
            $enquiry->contract_signed = true;
            $enquiry->status = 'CONTRACT_SIGNED';
            $enquiry->save();
        }


        return response()->json([
            'message' => 'Contract uploaded successfully',
        ]);
    }
}
