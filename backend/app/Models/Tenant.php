<?php

namespace App\Models;

use App\Notifications\SendCredentialsToTenantNotification;
use Carbon\Carbon;
use DateInterval;
use DateTime;
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
    protected $casts = [
        'commencement_date' => 'datetime:d-m-Y',
    ];

    public function getExpiryDateAttribute()
    {
        $expiry_date = new DateTime($this->commencement_date);
        $interval = new DateInterval('P'. $this->agreement_duration .'M');
        $expiry_date->add($interval);
        return $expiry_date->format('d-m-Y');
    }

    public function getTimeLeftAttribute() {
        $now = Carbon::now();
        return $now->diffInDays($this->expiry_date, false);
    }

    public function getRentMonthAttribute()
    {
        return number_format($this->ppm, 2, '.', '');
    }

    public function getTimeLeftStringAttribute() {
        if ($this->time_left > 0) {
            return $this->time_left . ' Days Left';
        }else{
            return 'Contract Expired '.abs($this->time_left).' Days Ago';
        }
    }

    public function getNextRentDueDateAttribute() {
        $day=  $this->commencement_date->format('d');
        $month_year = Carbon::now()->format('m-Y');
        return Carbon::createFromFormat('d-m-Y', $day.'-'.$month_year)->format('d-m-Y');
    }

    function getTotalRentPaidAttribute(){
        $total = $this->rentPayments->sum('amount');
        return $total;
    }

    function getTotalRentToPayAttribute(){
        $months_till_now = $this->commencement_date->diffInMonths(Carbon::now(), false) + 1;
        return $months_till_now * $this->rent_month;
    }

    function getRentBalanceAttribute(){
        return $this->total_rent_to_pay - $this->total_rent_paid;
    }

    public function rentPayments()
    {
        return $this->hasMany(RentPayments::class, 'tenant_id', 'id')->orderBy('created_at', 'desc');
    }

    public function sendCredentialsToTenantNotification($tenant, $initPassword)
    {
        $this->notify(new SendCredentialsToTenantNotification($tenant, $initPassword));
    }

    public function getPropertyAttribute() {
        return Property::find($this->property_id);
    }
}

