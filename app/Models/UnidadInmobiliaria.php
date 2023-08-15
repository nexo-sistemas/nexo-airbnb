<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnidadInmobiliaria extends Model
{
    use HasFactory, Uuid;

    protected $table =  'unidad_inmobiliaria';
    protected $primaryKey = 'uuid';

    protected $fillable = [
        'uuid',
        'id',
        'entidad_id',
        'propietario',
        'departamento'
    ];

    protected $hidden = [
       'created_at',
       'updated_at'
    ];


}
