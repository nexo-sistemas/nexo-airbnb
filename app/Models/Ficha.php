<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;

class Ficha extends Model
{
    use HasFactory, Uuid;

    protected $table = "ficha";
    protected $primaryKey = 'uuid';
    protected $fillable = [
        'uuid',
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
