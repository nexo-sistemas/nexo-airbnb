<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ficha extends Model
{
    use HasFactory;

    protected $table = "ficha";
    protected $fillable = [
        'id',
        'departamento',
        'estacionamiento',
        'numero_placa',
        'visitas',
        'ingreso',
        'salida',
        'infantes',
        'numero_huesped',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
     ];
}
