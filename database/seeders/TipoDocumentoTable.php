<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipoDocumentoTable extends Seeder
{

    public function run() : void
    {
        $tipo_documento = array(
            [
                'tipo' => 'CODIGO INTERNO'
            ],
            [
                'tipo' => 'DNI'
            ],
            [
                'tipo' => 'CE'
            ],
            [
                'tipo' => 'RUC'
            ],
            [
                'tipo' => 'PASAPORTE',
            ],
            [
                'tipo' => 'CARNET DE EXTRANJERÍA',
            ],
            [
                'tipo' => 'SIN DOCUMENTO',
            ]
        );

        DB::table('tipo_documento')->insert($tipo_documento);
    }
}

