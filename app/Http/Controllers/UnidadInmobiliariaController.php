<?php

namespace App\Http\Controllers;

use App\Models\Entidad;
use App\Models\UnidadInmobiliaria;
use App\Models\User;
use App\Models\UsuarioEntidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UnidadInmobiliariaController extends Controller
{
    public function index(Request $request)
    {
        $response = DB::select("
            SELECT unidad_inmobiliaria.uuid,entidad.nombre entidadNombre, unidad_inmobiliaria.departamento, CONCAT(users.nombre,' ',NULLIF(users.apellido,'')) propietario, users.celular
            FROM unidad_inmobiliaria
            JOIN users ON unidad_inmobiliaria.propietario =  users.id AND users.estado = TRUE
            JOIN entidad ON unidad_inmobiliaria.entidad_id = entidad.id AND entidad.estado = TRUE AND entidad.id = ?
            WHERE unidad_inmobiliaria.estado = TRUE
        ", [$request->e]);

        return response()->json([
            'ok' => true,
            'response' => $response
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'entidad_id' => 'required',
            'departamento' => 'required',
            'idpropietario' => 'required',
        ]);
        $unidad = new UnidadInmobiliaria();
        $unidad->departamento = $request->departamento;
        $unidad->propietario = $request->idpropietario;
        $unidad->entidad_id = $request->entidad_id;
        $unidad->save();
        return response()->json([
            'ok' => true,
            'response' => $unidad
        ]);
    }

    public function destroy($keyUnidad)
    {
        $unidad = UnidadInmobiliaria::find($keyUnidad);
        $unidad->estado = false;
        $unidad->save();
        return response()->json([
            'ok' => true,
            'response' => $keyUnidad
        ]);
    }

    public function userEntidad($entidad)
    {
        $response = DB::select("
            SELECT users.id,users.nombre, NULLIF(users.apellido,'') apellido
            FROM users
            JOIN usuario_entidad ON users.id = usuario_entidad.user_id AND usuario_entidad.entidad_id = ? AND usuario_entidad.estado = TRUE
            WHERE users.estado = TRUE AND users.user_type = '5'
        ", [$entidad]);

        return response()->json([
            'ok' => true,
            'response' => $response
        ]);
    }

    public function update(Request $request, $keyUnidad)
    {
        $unidad = UnidadInmobiliaria::find($keyUnidad);
        $unidad->departamento = $request->departamento;
        $unidad->propietario = $request->idpropietario;
        $unidad->save();

        return response()->json([
            'ok' => true,
            'response' => $unidad
        ]);
    }
}
