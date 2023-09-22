<?php

namespace App\Http\Controllers;

use App\Models\FichaHistorial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FichaHistorialController extends Controller
{
    public function index($fichaID) {
        return response()->json([
            'ok' => true,
            'response' => DB::select("SELECT * FROM table_historial_ficha WHERE ficha_id = ?", [$fichaID])
        ]);
    }

    public function store(Request $request){
        $ficha  = new FichaHistorial();
        $ficha->ficha_id = $request->ficha_id;
        $ficha->observacion = $request->observacion;
        $ficha->fechaRegistro = date('d/m/y H:i');
        $ficha->save();

        return response()->json([
            'ok' => true,
            'response' => $ficha
        ]);

    }



}
