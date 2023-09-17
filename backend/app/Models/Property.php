<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'properties';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'address',
        'type',
        'bedrooms',
        'bathrooms',
        'storeys',
        'is_furnished',
        'has_parking',
        'is_pg',
        'ppm',
        'deposit',
        'minimum_lease_period',
        'is_available',
        'photos',
        'landlord_id',
        'termination_notice_period',
        'deposit_refund_period',
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function landlord()
    {
        return $this->belongsTo(Landlord::class, 'landlord_id', 'id');
    }

    public function getPrefixAttribute() {
        $propWords = explode(' ', $this->name);
        $llWords = explode(' ', $this->landlord?->name);
        $prefix = 'RC';
        foreach ($propWords as $word) {
            $prefix .= $word[0];
        }
        foreach ($llWords as $word) {
            $prefix .= $word[0];
        }

        return $prefix;
    }

    public function getSlugAttribute() {
        $lowercaseString = strtolower($this->name);
        return str_replace(' ', '-', $lowercaseString);
    }


    protected static function boot()
    {
        parent::boot();

        Property::creating(function($model) {
            $model->prefix = $model->getPrefixAttribute();
            $model->slug = $model->getSlugAttribute();
        });
    }
}
