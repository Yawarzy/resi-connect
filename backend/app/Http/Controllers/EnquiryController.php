<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
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

        return response()->json([
            'message' => 'Enquiry created successfully',
            'enquiry' => $enquiry->makeHidden(['id_proof', 'address_proof', 'created_at', 'updated_at'])
        ], 201);
    }
}
