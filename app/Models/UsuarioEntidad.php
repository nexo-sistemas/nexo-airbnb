<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioEntidad extends Model
{
    use HasFactory;

    protected $table = 'usuario_entidad';

    protected $fillable = [
        'user_id',
        'entidad_id'
    ];
}
