<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $properties = Property::all();


        // type filter
        if ($request->has('type')) {
            if ($request->type != 'all')
                $properties = $properties->where('type', '=', $request->type);
        }

        // locality filter
        if ($request->has('locality')) {
            if ($request->locality != 'all')
                $properties = $properties->where('locality', '=', $request->locality);
        }

        // ppm filter
//        if ($request->has('ppm')) {
//            if ($request->ppm != 'all') {
//                $min = explode('-', $request->ppm)[0];
//                $max = explode('-', $request->ppm)[1];
//
//                $properties = $properties->whereBetween('ppm', [$min, $max]);
//            }
//        }

        // has pg
        if ($request->has('is_pg')) {
            if ($request->is_pg != 'any') {
                if ($request->is_pg == 'true')
                    $properties = $properties->where('is_pg', '=', true);
                else
                    $properties = $properties->where('is_pg', '=', false);
            }
        }

        // return array of properties
        return response()->json([
            'properties' => $properties->values()->toArray()
        ]);
    }
}
