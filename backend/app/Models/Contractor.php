<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Contractor extends Model
{
    use HasFactory, Notifiable;

    public function repairCategories()
    {
        return $this->hasMany(RepairCategory::class);
    }

}
