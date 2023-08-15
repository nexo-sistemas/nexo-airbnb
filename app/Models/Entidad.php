<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entidad extends Model
{
    use HasFactory, Uuid;

    protected $table="entidad";
    protected $primaryKey = 'uuid';

    protected $fillable = [
        'uuid',
        'id',
        'nombre',
    ];

    protected $hidden = [
       'created_at',
       'updated_at'
    ];

}
