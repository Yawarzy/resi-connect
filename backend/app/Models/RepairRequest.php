<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'tenant_id',
        'contractor_id',
        'room_no',
        'problem_description',
        'problem_breadcrumb',
        'files',
        'comments',
        'tenant_feedback',
        'contractor_feedback',
        'tenant_rating',
        'contractor_rating',
        'approved_by_admin',
        'tenant_approved',
        'contractor_approved',
        'admin_approve_slug',
        'tenant_approve_slug',
        'contractor_approve_slug',
        'contractor_job_cost',
        'job_cost',
        'paid',
    ];

    protected $appends = [
        'full_name',
        'email',
        'phone',
    ];

    protected $casts = [
        'property_id' => 'integer',
        'approved_by_admin' => 'boolean',
        'tenant_approved' => 'boolean',
        "contractor_approved" => "boolean",
        'paid' => 'boolean',
        "files" => "array",
    ];

    protected $with = ['contractor'];

    public function getFullNameAttribute()
    {
        return $this->tenant->full_name;
    }

    public function getEmailAttribute()
    {
        return $this->tenant->email;
    }

    public function getPhoneAttribute()
    {
        return $this->tenant->phone_number;
    }

    public function getApprovedByAdminAttribute($attr) {
        return strval($attr);
    }

    public function getTenantApprovedAttribute($attr) {
        return strval($attr);
    }

    public function getContractorApprovedAttribute($attr) {
        return strval($attr);
    }

    public function getPaidAttribute($attr) {
        return strval($attr);
    }

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function property(){
        return $this->belongsTo(Property::class);
    }

    public function contractor(){
        return $this->belongsTo(Contractor::class);
    }

}
