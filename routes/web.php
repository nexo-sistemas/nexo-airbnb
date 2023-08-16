<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('layout.auth');
})->name('login');

Route::get('/login-propietario', function (Request $request) {
    $user = User::find($request->u);
    if (!$user)
        return '<h1><center><b>No existe el usuario</b></center></h1>';
    return view('pages.login-propietario', ['user' => $user]);
});

Route::group([
    'middleware' => ['auth:sanctum']
], function () {

    Route::get('/frm', function (Request $request) {
        $entidad = DB::select("SELECT entidad.id,entidad.uuid, entidad.nombre FROM entidad WHERE id IN ( (SELECT usuario_entidad.entidad_id FROM usuario_entidad WHERE usuario_entidad.user_id = (SELECT users.id FROM users WHERE users.uuid = ? ) ) )", [$request->u]);
        return view('pages.ficha', [
            'entidad' => $entidad,
            'uuidUsuario' => $request->u
        ]);
    });

    Route::get('/entidades', function () {
        return view('pages.entidades');
    });

    Route::get('/portero', function () {
        return view('pages.portero');
    });

    Route::get('/administrador', function () {
        return view('pages.administrador');
    });
});

Route::get('/s', function (Request $request) {
    $url = Storage::temporaryUrl(
        $request->archive,
        now()->addMinutes(5)
    );
    return redirect($url);
})->middleware('auth:sanctum');
