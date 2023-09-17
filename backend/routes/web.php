<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();

    Route::get('/contract/{id}/generate', 'App\Http\Controllers\ContractController@generate')->name('voyager.contracts.generate');
    Route::get('/contract/{id}/send', 'App\Http\Controllers\ContractController@send')->name('voyager.contracts.send');
    Route::get('/convert-enquiry-to-tenant/{id}', 'App\Http\Controllers\TenantController@convertEnquiryToTenant')->name('voyager.tenants.convert-enquiry-to-tenant');


    Route::get('/tenants/rent-payments/{tenant}','App\Http\Controllers\RentPaymentsController@view')->name('tenants.rent-payments');
    Route::post('/tenants/{tenant}/add-payment', '\App\Http\Controllers\RentPaymentsController@addPayment');
    Route::post('/tenant/rent-payment-delete/{rentPayment}/', '\App\Http\Controllers\RentPaymentsController@deletePayment');
    Route::get('/tenants/rent-payment-confirmation/{rentPayment}', '\App\Http\Controllers\RentPaymentsController@sendConfirmation');


});

Route::get('/{any?}', function ($any = null) {
    return view('welcome');
})->where('any', '.*');
