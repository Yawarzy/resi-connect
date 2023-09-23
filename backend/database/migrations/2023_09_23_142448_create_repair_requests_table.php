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
        Schema::create('repair_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tenant_id');
            $table->unsignedBigInteger('property_id');
            $table->unsignedBigInteger('contractor_id');

            $table->text('room_no')->nullable();
            $table->longText('problem_description');
            $table->longText('files');

            $table->longText('comments')->nullable();

            $table->longText('tenant_feedback')->nullable();
            $table->longText('contractor_feedback')->nullable();

            $table->unsignedInteger('tenant_rating')->nullable();
            $table->unsignedInteger('contractor_rating')->nullable();

            $table->boolean('approved_by_admin')->default(false);
            $table->boolean('tenant_approved')->default(false);
            $table->boolean('contractor_approved')->default(false);

            $table->longText('admin_approve_slug')->nullable();
            $table->longText('tenant_approve_slug')->nullable();
            $table->longText('contractor_approve_slug')->nullable();

            $table->float('contractor_job_cost')->nullable();
            $table->float('job_cost')->nullable();
            $table->boolean('paid')->default(false);

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
        Schema::dropIfExists('repair_requests');
    }
};
