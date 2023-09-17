<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class RentPayments extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = [
        'amount',
        'date',
        'late_fee',
        'payment_method'
    ];
    protected $casts = [
        'date' => 'date',
        'confirmation_sent_date' => 'datetime'
    ];

    public function tenant() {
        return $this->belongsTo(Tenant::class);
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function sendRentConfirmationNotification(){
        $this->notify(new \App\Notifications\RentConfirmationNotification($this));
        $this->confirmation_sent_date = now();
        $this->update();
    }

    public function routeNotificationForMail($notification)
    {
        return $this->tenant->email;
    }

}
