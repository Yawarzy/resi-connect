<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

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
        'photos'
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
