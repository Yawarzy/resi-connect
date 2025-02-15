<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $properties = Property::query();

        // type filter
        if ($request->has('type')) {
            if ($request->type != 'all')
                $properties->where('type', '=', $request->type);
        }

        // locality filter
        if ($request->has('locality')) {
            if ($request->locality != 'all')
                $properties->where('locality', '=', $request->locality);
        }

        // has pg
        if ($request->has('is_pg')) {
            if ($request->is_pg != 'any') {
                if ($request->is_pg == 'true')
                    $properties->where('is_pg', '=', true);
                else
                    $properties->where('is_pg', '=', false);
            }
        }

        // min price filter
        if ($request->has('min_ppm')) {
            if ($request->min_ppm != 'any')
                $properties->where('ppm', '>=', $request->min_ppm);
        }

        // max price filter
        if ($request->has('max_ppm')) {
            if ($request->max_ppm != 'any')
                $properties->where('ppm', '<=', $request->max_ppm);
        }

        // Paginate the result
        $perPage = $request->input('pageSize', 3); // Set the number of items per page
        $currentPage = $request->input('page', 1);
        Paginator::currentPageResolver(function () use ($currentPage) {
            return $currentPage;
        });

        $paginatedProperties = $properties->paginate($perPage);

        // return paginated properties
        return response()->json([
            'properties' => $paginatedProperties->items(),
            'localities' => Property::select('locality')->distinct()->get(),
            'count' => [
                'filteredCount' => $paginatedProperties->total(),
                'totalCount' => Property::count(),
            ],
            'links' => [
                'first' => $paginatedProperties->url(1),
                'last' => $paginatedProperties->url($paginatedProperties->lastPage()),
                'prev' => $paginatedProperties->previousPageUrl(),
                'next' => $paginatedProperties->nextPageUrl(),
            ],
            'meta' => [
                'current_page' => $paginatedProperties->currentPage(),
                'last_page' => $paginatedProperties->lastPage(),
            ],
        ]);
    }


    public function show($slug)
    {
        $property = Property::where('slug', $slug)->orWhere('id', $slug)->firstOrFail();
        return response()->json([
            'property' => $property,
        ]);
    }
}
