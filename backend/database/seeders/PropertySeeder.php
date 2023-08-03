<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        \App\Models\Property::factory()->count(10)->create();
    }
}
