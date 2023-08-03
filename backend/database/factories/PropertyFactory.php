<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
//        $photos = '[';
//        for ($i = 0; $i < 5; $i++) {
//            $photos .= $this->faker->imageUrl('640', '480', 'property', true) . ',';
//        }
//        $photos .= ']';

        return [
            'name' => $this->faker->firstName(),
            'city' => 'Srinagar',
            'locality' => $this->faker->randomElement(['Rajbagh', 'Hyderpora', 'Khanyar', 'Nishat']),
            'full_address' => $this->faker->address(),
            'type' => $this->faker->randomElement(['apartment', 'house']),
            'bedrooms' => $this->faker->numberBetween(1, 10),
            'bathrooms' => $this->faker->numberBetween(1, 10),
            'storeys' => $this->faker->numberBetween(1, 3),
            'is_furnished' => $this->faker->boolean(),
            'has_parking' => $this->faker->boolean(),
            'is_pg' => $this->faker->boolean(),
            'ppm' => $this->faker->randomElement([5000, 8000, 12000]),
            'deposit' => $this->faker->randomElement([10000, 12000]),
            'minimum_lease_period' => $this->faker->numberBetween(6, 10),
            'is_available' => $this->faker->boolean(),
            'photos' => $this->generatePhotos(),

        ];
    }

    /**
     * @param $faker \Faker\Generator
     * @return array of photos
     */
    private function generatePhotos()
    {
        $photos = [];
        for ($i = 0; $i < 5; $i++) {
            $photos[] = $this->faker->imageUrl(640, 480, 'nature');
        }
        return $photos;
    }
}
