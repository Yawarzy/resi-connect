<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairCategory extends Model
{
    use HasFactory;

    protected $with = ['problems'];

    protected $hidden = ['created_at', 'updated_at'];

    public function problems()
    {
        return $this->hasMany(Problem::class);
    }

    public function contractor()
    {
        return $this->belongsTo(Contractor::class);
    }
}
