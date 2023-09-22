<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConserjeController;
use App\Http\Controllers\EntidadController;
use App\Http\Controllers\FichaController;
use App\Http\Controllers\FichaHistorialController;
use App\Http\Controllers\PropietarioController;
use App\Http\Controllers\UnidadInmobiliariaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/login/propietario', [PropietarioController::class, 'login_propietario']);

Route::group([
    'middleware' => ['auth:sanctum']
], function () {
    Route::resource('/entidades', EntidadController::class);
    Route::resource('/unidades', UnidadInmobiliariaController::class);
    Route::get('/unidades/propietarios/{entidad}', [UnidadInmobiliariaController::class, 'userEntidad']);
    Route::get('/unidades/{uuidUsuario}/{entidadID}', [UnidadInmobiliariaController::class, 'unidadXEntidad']);
    Route::resource('/propietarios', PropietarioController::class);
    Route::get('/propietarios/phone/{phone}', [PropietarioController::class, 'showPhone']);
    Route::resource('/conserje', ConserjeController::class);
    Route::post('/auth/logout',[AuthController::class, 'logout']);
    Route::put('/ficha/administrador/update/fechas/{id}', [FichaController::class, 'updateFechasAdministrador']);
    Route::post('/ficha/portero/update/adjunto', [FichaController::class, 'updateAdjunto']);
    Route::post('/ficha/portero/update/fecha-salida', [FichaController::class, 'updateFechaSalida']);
    Route::get('ficha/historial/{fichaID}', [FichaHistorialController::class, 'index']);
    Route::post('ficha/historial', [FichaHistorialController::class, 'store']);
});

Route::resource('/ficha', FichaController::class);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
