<?php

namespace App\Http\Controllers;

use App\Models\Entidad;
use App\Models\Ficha;
use App\Models\FichaUser;
use App\Models\UnidadInmobiliaria;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FichaController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'ok' => true,
            'response' => DB::select("
            SELECT
            ficha.id fichaid,
            users.nacionalidad,
            users.principal,
            users.id users_id,
            CONCAT(users.nombre,' ',NULLIF(users.apellido,'')) usuario,
            (SELECT unidad_inmobiliaria.departamento FROM unidad_inmobiliaria WHERE unidad_inmobiliaria.id = ficha.departamento_id) departamento,
            (SELECT tipo_documento.tipo FROM tipo_documento WHERE tipo_documento.id = users.tipo_documento_id) tipodocumento,
            users.numero_documento,
            DATE_FORMAT(ficha.ingreso, '%d/%m/%Y %H:%i') ingreso,
            DATE_FORMAT(ficha.salida, '%d/%m/%Y %H:%i') salida
            FROM ficha
            JOIN ficha_user ON ficha_user.ficha_id = ficha.id AND ficha_user.estado = TRUE
            JOIN users ON ficha_user.user_id = users.id AND users.estado = TRUE AND users.user_type = '4'
            WHERE ficha.estado = TRUE
            AND ficha.entidad_id = ?
            AND DATE_ADD(ficha.salida, interval 1 day) > NOW()
            ", [$request->e])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $directory = 'app-arbn';
        $ficha = new Ficha();
        $ficha->entidad_id = $request->entidad;
        $ficha->departamento_id = $request->departamento_id;
        $ficha->estacionamiento = $request->estacionamiento ?? "";
        $ficha->numero_placa = $request->numero_placa ?? "";
        $ficha->visitas =  $request->visitas ?? "";
        $ficha->ingreso = $request->ingreso ?? "";
        $ficha->salida = $request->salida ?? "";
        $ficha->infantes = $request->infantes ?? "";
        $ficha->numero_huesped = $request->numero_huesped ?? "";
        $ficha->save();
        $adjunto = "";
        for ($i = 1; $i <= $request->numero_huesped; $i++) {



            //if ($request->hasFile('adjunto-' . $i)) {
                //$adjunto = $request->file('adjunto-' . $i)->store($directory, 'vultr');
            //}


            $user = new User();
            $user->nombre  = $request->input("nombre-" . $i);
            $user->apellido = $request->input("apellido-" . $i);
            $user->tipo_documento_id = $request->input("tipo_documento_id-" . $i);
            $user->numero_documento = $request->input("numero_documento-" . $i);
            $user->user_type = '4';
            $user->principal = $request->input("principal-" . $i);
            $user->nacionalidad = $request->input("nacionalidad-" . $i);
            $user->save();

            $fichaUser = new FichaUser();
            $fichaUser->ficha_id = Ficha::find($ficha->uuid)->id;
            $fichaUser->user_id = User::find($user->uuid)->id;
            $fichaUser->save();
        }

        return response()->json([
            'ok' => true,
            'message' => "Se guardo correctamente",
            'ficha' => $ficha
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $fichaDetalle = DB::select(
            "SELECT
            ficha.id fichaID,
            ficha.entidad_id,
            users.id users_id,
            users.`uuid` users_key,
            users.nombre,
            users.nacionalidad,
            users.principal,
            users.hora_salida,
            IFNULL(users.apellido,'') apellido,
            (SELECT unidad_inmobiliaria.departamento FROM unidad_inmobiliaria WHERE unidad_inmobiliaria.id = ficha.departamento_id) departamento,
            (SELECT tipo_documento.tipo FROM tipo_documento WHERE tipo_documento.id = users.tipo_documento_id) tipodocumento,
            users.numero_documento,
            ficha.ingreso,ficha.salida,
            users.adjunto adjunto,
            users.adjunto_conserje adjunto_conserje,
            users.hora_ingreso hora_ingreso,
            ficha.estacionamiento,
            ficha.numero_placa,
            CASE ficha.visitas WHEN '1' THEN 'LIBRE' ELSE 'Previa autorización' END visita,
            ficha.infantes  infantes,
            ficha.numero_huesped
            FROM ficha
            JOIN ficha_user ON ficha.id = ficha_user.ficha_id AND ficha_user.estado = TRUE
            JOIN users ON ficha_user.user_id = users.id AND users.estado = TRUE
            where ficha.estado = TRUE AND users.id = ?",
            [$id]
        )[0];

        return response()->json([
            'ok' => true,
            'response' => $fichaDetalle,
            'unidades' => UnidadInmobiliaria::where('estado', true)->where('entidad_id', $fichaDetalle->entidad_id)->get()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $ficha = Ficha::find($id);
        $ficha->estado = FALSE;
        $ficha->save();

        return response()->json([
            'ok' => TRUE,
            'mesagge' => 'Se elimino el registro con exito'
        ]);
    }

    public function updateFechasAdministrador(Request $request, $id)
    {
        $ficha = Ficha::find($id);
        $ficha->salida = $request->salida;
        $ficha->save();

        return response()->json([
            'ok' => true,
            'response' => $ficha
        ]);
    }

    public function updateAdjunto(Request $request)
    {
        date_default_timezone_set("America/Lima");

        $directory = 'app-arbn';
        if (!$request->hasFile('file')) {
            return response()->json([
                'ok' => false,
                'errors' => ['Ingresar un  adjunto'],
            ], 422);
        }


        $adjunto = $request->file('file')->store($directory, 'vultr');
        $user = User::find($request->userKey);
        $user->hora_ingreso = date("d/m/Y H:i");
        $user->adjunto_conserje = $adjunto;
        $user->save();

        $returnResponse = DB::select(
            "SELECT f.*,
                (
                    SELECT JSON_OBJECT('numPropietario',us.celular,'departamento',uni.departamento)
                    FROM unidad_inmobiliaria uni
                    JOIN users us ON uni.propietario = us.id AND us.estado = TRUE
                    WHERE uni.estado = TRUE AND uni.id = f.departamento_id
                ) dataPropietario
                FROM ficha_user fu
                JOIN ficha f ON fu.ficha_id = f.id AND f.estado = TRUE
                WHERE fu.estado = TRUE AND fu.user_id = ?
                ",
            [$user->id]
        )[0];

        $returnResponse->user = $user;

        return response()->json([
            'ok' => true,
            'message' => "Se guardo correctamente",
            'response' => $returnResponse,
            'file' => 'https://sjc1.vultrobjects.com/airbnb/'.$adjunto
        ]);

    }

    public function updateFechaSalida(Request $request){
        $user = User::find($request->userKey);
        $user->hora_salida = $request->fechaSalida;
        $user->save();
        $returnResponse = DB::select(
            "SELECT f.*,
                (
                    SELECT JSON_OBJECT('numPropietario',us.celular,'departamento',uni.departamento)
                    FROM unidad_inmobiliaria uni
                    JOIN users us ON uni.propietario = us.id AND us.estado = TRUE
                    WHERE uni.estado = TRUE AND uni.id = f.departamento_id
                ) dataPropietario
                FROM ficha_user fu
                JOIN ficha f ON fu.ficha_id = f.id AND f.estado = TRUE
                WHERE fu.estado = TRUE AND fu.user_id = ?
                ",
            [$user->id]
        )[0];

        $returnResponse->user = $user;
        return response()->json([
            'ok' => true,
            'message' => "Se guardo correctamente",
            'response' => $returnResponse
        ]);
    }
}
