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
        Schema::create('ficha', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->unsignedBigInteger('entidad_id');
            $table->foreign('entidad_id')
            ->references('id')
            ->on('entidad');
            $table->unsignedBigInteger('departamento_id');
            $table->foreign('departamento_id')
            ->references('id')
            ->on('unidad_inmobiliaria');
            $table->string('estacionamiento',20)->nullable();
            $table->string('numero_placa',30)->nullable();
            $table->char('visitas', 1)->comment('1 - Libre, 2 - Previa autorización');
            $table->dateTime('ingreso');
            $table->dateTime('salida');
            $table->char('infantes',2);
            $table->integer('numero_huesped');
            $table->boolean('estado')->default(TRUE);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ficha');
    }
};
