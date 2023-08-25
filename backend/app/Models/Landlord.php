<?php

namespace App\Models;

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

    public function properties()
    {
        return $this->hasMany(Property::class, 'landlord_id', 'id');
    }

    public function sendEnquiryReceivedNotifications($enquiry, $landlord)
    {
        $this->notify(new \App\Notifications\EnquiryReceivedNotification($enquiry, $landlord));
    }
}
