<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use App\Models\Property;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TenantController extends Controller
{
    public function convertEnquiryToTenant(Enquiry $id)
    {
        // update the status of the enquiry to VERIFIED
        $id->status = 'VERIFIED';
        $id->save();

        // get the ppm and deposit from the property
        $property = Property::where('id', $id->property_id)->first();
        $ppm = $property->ppm;
        $deposit = $property->deposit;

        // create a unique first password (store it in a variable)
        $password = Str::random(8);

        // create a user
        $user = User::create([
            'name' => $id->full_name,
            'email' => $id->email,
            'password' => Hash::make($password),
            'role_id' => 2,
        ]);

        $user->role_id = 2;
        $user->save();

        // convert the enquiry to tenant
        $tenant = Tenant::create([
            'user_id' => $user->id,
            'property_id' => $id->property_id,
            'full_name' => $id->full_name,
            'date_of_birth' => $id->date_of_birth,
            'email' => $id->email,
            'phone_number' => $id->phone_number,
            'alternate_phone_number' => $id->alternate_phone_number,
            'home_address' => $id->home_address,
            'id_proof' => $id->id_proof,
            'address_proof' => $id->address_proof,
            'unsigned_contract' => $id->unsigned_contract,
            'signed_contract' => $id->signed_contract,
            'agreement_duration' => $id->agreement_duration,
            'commencement_date' => $id->commencement_date,
            'status' => $id->status,
            'upload_contract_slug' => $id->upload_contract_slug,
            'ppm' => $ppm,
            'deposit' => $deposit,
        ]);


        $tenant->sendCredentialsToTenantNotification($tenant, $password);


        return redirect()->route('voyager.enquiries.index')->with([
            'message' => 'Successfully converted the enquiry to tenant.',
            'alert-type' => 'success',
        ]);
    }
}
