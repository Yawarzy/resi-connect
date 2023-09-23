<?php

namespace App\Http\Controllers;

use App\Models\RepairCategory;

class RepairCategoryController extends Controller
{
    public function index() {
        return RepairCategory::all();
    }
}
