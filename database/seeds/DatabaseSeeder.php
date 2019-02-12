<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(MenuTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(AuthTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        // $this->call(UsersTableSeeder::class);
    }
}
