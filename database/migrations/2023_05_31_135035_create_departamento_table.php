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
        Schema::create('unidad_inmobiliaria', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->unsignedBigInteger('entidad_id');
            $table->foreign('entidad_id')
            ->references('id')
            ->on('entidad');
            $table->unsignedBigInteger('propietario');
            $table->foreign('propietario')
            ->references('id')
            ->on('users');
            $table->string('departamento',100);
            $table->boolean('estado')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unidad_inmobiliaria');
    }



};
