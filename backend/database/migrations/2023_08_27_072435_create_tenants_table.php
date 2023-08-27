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
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->string('full_name', 40);
            $table->string('email', 40)->unique();
            $table->string('date_of_birth');
            $table->string('phone_number', 40);
            $table->string('alternate_phone_number', 40)->nullable();
            $table->string('home_address', 255);

            $table->longText('id_proof');
            $table->longText('address_proof');

            $table->longText('unsigned_contract')->nullable();
            $table->longText('signed_contract')->nullable();

            $table->string('agreement_duration')->nullable();
            $table->dateTime('commencement_date')->nullable();

            $table->enum('status', ['PENDING', 'CONTRACT_MAILED', 'CONTRACT_SIGNED', 'VERIFIED'])->default('PENDING');
            $table->string('upload_contract_slug')->unique()->nullable();

            $table->float('ppm');
            $table->float('deposit');

            $table->foreignId('property_id')->constrained('properties');
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
        Schema::dropIfExists('tenants');
    }
};
