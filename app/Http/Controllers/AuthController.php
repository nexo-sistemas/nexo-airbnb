<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UsuarioEntidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'usuario' => 'required',
            'password' => 'required',
        ]);

        $credentials['estado'] = true;
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'ok' => false,
                'message' => 'La contraseña no es correcta, o no tiene acceso.',
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

    public function logout()
    {
        Auth::user()->tokens()->delete();
        Auth::guard('web')->logout();
        return response()->json([
            'ok' => true,
            'msg' => 'se cerro session'
        ]);
    }
}
