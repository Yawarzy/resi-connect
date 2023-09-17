<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('landlords', function (Blueprint $table) {
            $table->string('bank_account_name')->nullable();
            $table->string('back_account_no')->nullable();
            $table->string('bank_account_ifsc_code')->nullable();
            $table->enum('bank_account_type', ['Savings', 'Current'])->nullable();
            $table->string('bank_address')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('landlords', function (Blueprint $table) {
            //
        });
    }
};
