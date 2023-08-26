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
});

Route::get('/{any?}', function ($any = null) {
    return view('welcome');
})->where('any', '.*');
