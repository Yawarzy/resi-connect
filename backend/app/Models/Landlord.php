<?php

namespace App\Models;

use App\Notifications\EnquiryReceivedNotification;
use App\Notifications\LandlordRepairRequestReceivedNotification;
use App\Notifications\SendTenantUploadedSignedContractNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Landlord extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'landlords';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'user_id',
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function properties()
    {
        return $this->hasMany(Property::class, 'landlord_id', 'id');
    }

    public function sendEnquiryReceivedNotifications($enquiry, $landlord)
    {
        $this->notify(new EnquiryReceivedNotification($enquiry, $landlord));
    }

    public function sendRepairRequestReceivedNotifications($repairRequest)
    {
        $this->notify(new LandlordRepairRequestReceivedNotification($repairRequest));
    }

    public function sendTenantUploadedSignedContractNotification($enquiry, $file)
    {
        $this->notify(new SendTenantUploadedSignedContractNotification($enquiry, $file, $this));
    }
}
