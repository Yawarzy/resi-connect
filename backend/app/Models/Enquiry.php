<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Enquiry extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'enquiries';
    protected $primaryKey = 'id';

    protected $fillable = [
        'full_name',
        'date_of_birth',
        'email',
        'phone_number',
        'alternate_phone_number',
        'home_address',
        'id_proof',
        'address_proof',
        'unsigned_contract',
        'signed_contract',
        'agreement_duration',
        'commencement_date',
        'status',
        'upload_contract_slug'
    ];
}
