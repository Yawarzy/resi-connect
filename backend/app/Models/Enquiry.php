<?php

namespace App\Models;

use App\Notifications\SendContractToTenantNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Enquiry extends Model
{
    use HasFactory, SoftDeletes, Notifiable;

    protected $table = 'enquiries';
    protected $primaryKey = 'id';
    protected $fillable = [
        'property_id',
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
    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
    protected $casts = [
        'created_at' => 'datetime:d-m-Y',
    ];

    public function getContractSignedAttribute($attr) {
        if ($attr) {
            return 'Yes';
        } else {
            return 'No';
        }
    }

    public function getCreatedAtAttribute()
    {
        return date('d/m/Y h:m A', strtotime($this->attributes['created_at']));
    }


    public function sendContractToTenantNotification($enquiry, $file)
    {
        $this->notify(new SendContractToTenantNotification($enquiry, $file));
    }
}
