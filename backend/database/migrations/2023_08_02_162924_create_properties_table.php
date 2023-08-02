<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('city');
            $table->string('locality');
            $table->string('full_address');
            $table->enum('type', ['apartment', 'house']);
//            $table->foreignId('landlord_id')->constrained('landlords');

            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->integer('storeys')->nullable();

            $table->boolean('is_furnished');
            $table->boolean('has_parking');
            $table->boolean('is_pg');

            $table->float('ppm');
            $table->float('deposit');
            $table->integer('minimum_lease_period');
            $table->boolean('is_available');

            $table->longText('photos')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('properties');
    }
};
