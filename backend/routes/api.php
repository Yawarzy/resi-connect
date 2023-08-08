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

// Public routes
Route::get('/properties', 'App\Http\Controllers\PropertyController@index');
Route::get('/properties/{id}', 'App\Http\Controllers\PropertyController@show');
Route::post('/enquiries', 'App\Http\Controllers\EnquiryController@store');
Route::get('/enquiries', 'App\Http\Controllers\EnquiryController@index');
