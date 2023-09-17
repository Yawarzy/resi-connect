<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use TCG\Voyager\Facades\Voyager;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Voyager::addAction(\App\Actions\GenerateContractAction::class);
        Voyager::addAction(\App\Actions\SendContractAction::class);
        Voyager::addAction(\App\Actions\ConvertToTenantAction::class);
        Voyager::addAction(\App\Actions\ViewTenantRentPayments::class);
    }
}
