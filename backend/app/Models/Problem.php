<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Problem extends Model
{
    use HasFactory;

    protected $hidden = ['created_at', 'updated_at'];

    protected $casts = [
        'is_emergency' => 'boolean',
    ];

    public function repairCategory()
    {
        return $this->belongsTo(RepairCategory::class);
    }
}
