<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// middleware group
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/secret', function () {
        // json
        return response()->json([
            'message' => 'secret page',
            'status' => 'authenticated'
        ]);
    });

    Route::post('/logout', 'App\Http\Controllers\AuthController@logout');
});

/**
 * Auth
 */
Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::post('/is-authenticated', 'App\Http\Controllers\AuthController@isAuthenticated');

// Public routes
/**
 * Properties
 */
Route::get('/properties', 'App\Http\Controllers\PropertyController@index');
Route::get('/properties/{id}', 'App\Http\Controllers\PropertyController@show');

/**
 * Enquiries
 */
Route::get('/enquiries', 'App\Http\Controllers\EnquiryController@index');
Route::post('/enquiries', 'App\Http\Controllers\EnquiryController@store');
Route::post('/enquiries/is-contract-signed', 'App\Http\Controllers\EnquiryController@isContractSigned');
Route::post('/enquiries/upload-contract', 'App\Http\Controllers\EnquiryController@uploadContract');
