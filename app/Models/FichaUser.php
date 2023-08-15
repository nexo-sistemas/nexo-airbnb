<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FichaUser extends Model
{
    use HasFactory;

    protected $table="ficha_user";

    protected $fillable = [
        'id',
        'user_id',
        'ficha_id'
    ];

    protected $hidden = [
       'created_at',
       'updated_at'
    ];

}
