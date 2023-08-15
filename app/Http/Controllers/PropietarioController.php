<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\UsuarioEntidad;

class PropietarioController extends Controller
{
    public function index(Request $request)
    {
        $response = DB::select("
            SELECT users.uuid,users.nombre, NULLIF(users.apellido,'') apellido, users.celular
            FROM users
            JOIN usuario_entidad ON users.id = usuario_entidad.user_id AND usuario_entidad.entidad_id = ? AND usuario_entidad.estado = TRUE
            WHERE users.estado = TRUE AND users.user_type = '5'
            group by users.id
        ", [$request->e]);
        return response()->json([
            'ok' => true,
            'response' => $response
        ]);
    }

    public function showPhone($phone)
    {
        $user = User::where('celular', $phone)->select('nombre', 'apellido', 'uuid')->first();
        return response()->json([
            'ok' => true,
            'response' => $user
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'entidad_id' => 'required',
            'nombre' => 'required',
            'celular' => 'required',
            'codigoCelular' => 'required',
        ]);

        $user = (strlen($request->propietario_uuid) > 10) ? User::find($request->propietario_uuid) : new User();
        $user->nombre = $request->nombre;
        $user->apellido = $request->apellido ?? '';
        $user->celular = $request->codigoCelular . $request->celular;
        $user->user_type = '5';
        $user->save();

        // valida si el usuario tiene asignado la entidad

        $usuarioEntidad = UsuarioEntidad::where('user_id', $user->id)->where('entidad_id', $request->entidad_id)->first();

        if (!$usuarioEntidad) {
            $userFind = User::find($user->uuid);
            $usuarioEntidad = new UsuarioEntidad();
            $usuarioEntidad->user_id = $userFind->id;
            $usuarioEntidad->entidad_id = $request->entidad_id;
            $usuarioEntidad->save();
        }

        return response()->json([
            'ok' => true,
            'response' => [
               'uuid' => $user->uuid,
               'nombre' => $user->nombre,
               'apellido' => $user->apellido,
               'celular' => $user->celular
            ]
        ]);
    }
    public function destroy($keyUnidad)
    {
        $unidad = User::find($keyUnidad);
        $unidad->estado = false;
        $unidad->save();
        return response()->json([
            'ok' => true,
            'response' => $keyUnidad
        ]);
    }
    public function login_propietario(Request $request, $uuid){

        $credentials = $request->validate([
            'password' => 'required',
            ''
        ]);

        $credentials['estado'] = true;
        if (!Auth::attempt([


        ])) {
            return response()->json([
                'ok' => false,
                'message' => 'Email o contraseña inválidos, o no tiene acceso.',
            ], 401);
        }

        $user = User::where('usuario', $request->usuario)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        $entidad_id = UsuarioEntidad::where('user_id', $user->id)->first();
        return response()->json([
            'ok' => true,
            'user' => [
                'nombre' => $user->nombre,
                'usuario' => $user->usuario,
                'keyUser' => $user->uuid,
                'user_type' => $user->user_type,
                'keyEntidad' => $entidad_id->entidad_id ?? 0
            ]
        ], 200);
    }
}
