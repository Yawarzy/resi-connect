<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    public function index()
    {
        return Enquiry::all();
    }

    public function store(Request $request)
    {
        $validatedRequest = $request->validate([
            'full_name' => 'required',
            'date_of_birth' => 'required|date',
            'email' => 'required|email',
            'phone_number' => 'required|numeric|digits:10',
            'alternate_phone_number' => 'nullable|numeric|digits:10',
            'home_address' => 'required',
            'id_proof' => 'required|file|mimes:pdf,doc,docx,jpg,jpeg,png',
            'address_proof' => 'required|file|mimes:pdf,doc,docx,jpg,jpeg,png',
        ]);

//        $idProof = $request->file('id_proof')->storeAs('id_proofs', $validatedRequest['full_name'] . '_' . $validatedRequest['date_of_birth'] . '_' . uniqid() . '.' . $request->file('id_proof')->extension());
//        $addressProof = $request->file('address_proof')->storeAs('address_proofs', $validatedRequest['full_name'] . '_' . $validatedRequest['date_of_birth'] . '_' . uniqid() . '.' . $request->file('address_proof')->extension());

//        $validatedRequest['id_proof'] = $idProof;
//        $validatedRequest['address_proof'] = $addressProof;

        $enquiry = Enquiry::create($validatedRequest);

        // TODO: Send email to Landlord

        return response()->json([
            'message' => 'Enquiry created successfully',
            'enquiry' => $enquiry->makeHidden(['id_proof', 'address_proof', 'created_at', 'updated_at'])
        ], 201);
    }
}
