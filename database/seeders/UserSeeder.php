<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'nombre' => 'Admin',
            'usuario' => 'nexo-admin',
            'password' => Hash::make('nexo$$2023'),
            'user_type' => 1
        ]);
    }
}
