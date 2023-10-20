<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use App\Models\Landlord;
use App\Models\Property;
use Barryvdh\DomPDF\Facade\Pdf;

class ContractController extends Controller
{
    public function generate(Enquiry $id)
    {
        // Get the property
        $property = Property::find($id->property_id);

        // Get the landlord
        $landlord = Landlord::find($property->landlord_id);

        // Generate the contract
        $pdf = PDF::loadView('contract', [
            'enquiry' => $id,
            'landlord' => $landlord,
            'property' => $property,
        ])->setPaper('a4', 'portrait');


        $name = implode('_', explode(' ', $id->full_name));
        // name the file with the enquiry name, and current utc date and a unique id
        $filename = 'unsigned_contract_' . $name . '_' . date('Y-m-d_H-i-s') . '_' . uniqid() . '.pdf';

        // save the contract to storage/app/contracts
        $pdf->save(storage_path('app/public/contracts/unsigned/' . $filename));
        $filePathObj = [[
            'download_link' => 'contracts/unsigned/' . $filename,
            'original_name' => $filename
        ]];

        // save the path of the contract file in the enquiry table
        $id->unsigned_contract = json_encode($filePathObj);

        // generate upload_contract_slug
        $id->upload_contract_slug = md5(uniqid() . time());
        $id->save();

        // download the contract
        return $pdf->download($filename);
    }


    public function send(Enquiry $id)
    {
        // get the unsigned contract path
        $unsigned_contract = json_decode($id->unsigned_contract)[0]->download_link;

        // get file from storage
        $file = storage_path('app/public/' . $unsigned_contract);

        // send the notification with the file
        $id->sendContractToTenantNotification($id, $file);

        // update the status of the enquiry
        $id->status = 'CONTRACT_MAILED';
        $id->save();

        // return to the enquiry page with a success message
        return redirect()->route('voyager.enquiries.index')->with([
            'message' => 'Contract sent successfully',
            'alert-type' => 'success'
        ]);
    }
}
