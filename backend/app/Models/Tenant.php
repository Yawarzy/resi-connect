<?php

namespace App\Models;

use App\Notifications\SendCredentialsToTenantNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Tenant extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'tenants';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
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
        'upload_contract_slug',
        'ppm',
        'deposit',
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function sendCredentialsToTenantNotification($tenant, $initPassword)
    {
        $this->notify(new SendCredentialsToTenantNotification($tenant, $initPassword));
    }
}
