<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->integer('tipo_documento_id')->nullable();
            $table->string('nombre', 100)->nullable();
            $table->string('apellido', 150)->nullable();
            $table->string('celular', 25)->nullable();
            $table->string('numero_documento', 50)->nullable();
            $table->string('nacionalidad', 80)->nullable();
            $table->string('usuario')->nullable();
            $table->string('adjunto')->nullable();
            $table->string('adjunto_conserje')->nullable();
            $table->string('hora_ingreso')->nullable();
            $table->string('hora_salida')->nullable();
            $table->char('principal',2)->nullable()->comment('SI-Huesped Principal,NO-normal');
            $table->string('password_vista')->nullable();
            $table->string('password')->nullable();
            $table->char('user_type',1)->nullable()->comment('1-admin,2-administrador, 3-conserge o portero, 4- inquilino o Huesped, 5- Propietario');
            $table->boolean('estado')->default(true);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
