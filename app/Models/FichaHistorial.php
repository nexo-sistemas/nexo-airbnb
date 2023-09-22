<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FichaHistorial extends Model
{
    use HasFactory;
    protected $table = 'table_historial_ficha';

    protected $fillable = [
        'ficha_id',
        'observacion',
        'fechaRegistro'
    ];
}
