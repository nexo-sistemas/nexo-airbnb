<?php

namespace App\Http\Controllers;

use App\Models\Entidad;
use App\Models\User;
use App\Models\UsuarioEntidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EntidadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'ok' => true,
            'url' => env('APP_URL'),
            'response' => DB::select("
                SELECT
                entidad.nombre,
                users.usuario usuario,
                users.password_vista password,
                entidad.uuid
                FROM usuario_entidad
                JOIN entidad ON usuario_entidad.entidad_id = entidad.id AND entidad.estado = TRUE
                JOIN users ON usuario_entidad.user_id = users.id AND users.estado = TRUE AND users.user_type = '2'
                WHERE entidad.estado = TRUE
            ")
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
        $request->validate([
            'nombre' => 'required',
            'usuario' => 'required',
            'password' => 'required'
        ]);


        $usuario = User::where('usuario', $request->usuario)->where('estado', true)->first();

        if ($usuario) {
            return response()->json([
                'ok' => false,
                'validateExistingUser' => true,
                'errors' => "El usuario <b>$request->usuario</b>  ya exite en la base de datos, por favor asignar otro usuario",
            ], 422);
        }


        $user = new User();
        $user->nombre = $request->nombre;
        $user->usuario = $request->usuario;
        $user->password_vista = $request->password;
        $user->password = Hash::make($request->password);
        $user->user_type = '2';
        $user->save();


        $entidad = new Entidad();
        $entidad->nombre = $request->nombre;
        $entidad->save();



        $entidadFind = Entidad::find($entidad->uuid);
        $userFind = User::find($user->uuid);

        $usuarioEntidad = new UsuarioEntidad();
        $usuarioEntidad->user_id = $userFind->id;
        $usuarioEntidad->entidad_id = $entidadFind->id;
        $usuarioEntidad->save();

        return response()->json([
            'ok' => true,
            'response' => [
                'key' => $entidad->uuid,
                'nombre' => $entidadFind->nombre,
                'usuario' => $userFind->usuario,
                'password' => $userFind->password_vista,
            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($key)
    {

        $entidad = Entidad::where('id', $key)->first();
        return response()->json([
            'ok' => true,
            'response' => [
                'entidad' => $entidad->nombre
            ]
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Entidad $entidad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $keyEntidad)
    {
        $request->validate([
            'nombre' => 'required',
            'usuario' => 'required',
            'password' => 'required'
        ]);

        $entidad = Entidad::find($keyEntidad);
        $entidad->nombre = $request->nombre;
        $entidad->save();

        $entidadFind = Entidad::find($entidad->uuid);
        $entidadUsuario = DB::table('users')
        ->join('usuario_entidad', 'users.id', '=', 'usuario_entidad.user_id')
        ->select('users.uuid')->where('users.estado', true)->where('usuario_entidad.estado', true)->first();

        $usuario = User::find($entidadUsuario->uuid);
        $usuario->usuario = $request->usuario;
        $usuario->password_vista = $request->password;
        $usuario->password = Hash::make($request->password);
        $usuario->save();

        return response()->json([
            'ok' => true,
            'response' => [
                'key' => $entidad->uuid,
                'nombre' => $entidadFind->nombre,
                'usuario' => $usuario->usuario,
                'password' => $usuario->password_vista
            ]
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($keyEntidad)
    {
        $entidad = Entidad::find($keyEntidad);
        $entidad->estado = false;
        $entidad->save();
        return response()->json([
            'ok' => true,
            'response' => $keyEntidad
        ]);
    }
}
