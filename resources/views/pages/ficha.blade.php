@extends('app')
@section('title', 'Ficha')
@section('script-page')
    @vite(['resources/js/pages/ficha.js'])
@endsection
@section('content')
    <main class="main-content position-relative max-height-vh-100 h-100">
        <nav class="navbar navbar-main navbar-expand-lg px-0" id="navbarBlur" navbar-scroll="true" style="background: #001a57">
            <div class="container-fluid">
                <nav aria-label="breadcrumb">
                    <img src="{{ Vite::asset('resources/images/logoNexo.png') }}" class="navbar-brand-img h-100"
                        style="width: 130px;" alt="main_logo">
                </nav>
            </div>
        </nav>
        <div class="container mt-5">
            <div class="card z-index-0">
                <div class="card-body">
                    <form class="row g-3" class="needs-validation" id="ficha-form" novalidate>
                        <input type="hidden" name="key" value="{{ $key }}">
                        <div class="col-md-6 col-lg-3">
                            <label for="departamento" class="form-label"><span
                                    style="color: red">(*)</span>Departamento</label>
                            <select name="departamento" id="departamento" class="form-select" required>
                                <option selected value="">Seleccionar</option>
                                @foreach ($unidades as $unidad)
                                    <option value='{{ $unidad->id }}'>{{ $unidad->departamento }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <label for="estacionamiento" class="form-label">Cochera(en caso aplique)</label>
                            <input type="text" class="form-control" name="estacionamiento" id="estacionamiento"
                                placeholder="Estacionamiento o cochera">
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <label for="numero_placa" class="form-label">Número de Placa</label>
                            <input type="text" name="numero_placa" class="form-control" id="numero_placa"
                                placeholder="Estacionamiento o cochera">
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <label for="visitas" class="form-label"><span style="color: red">(*)</span>Autorización de
                                visitas</label>
                            <select id="visitas" name="visitas" class="form-select" required>
                                <option selected value="">Seleccionar</option>
                                <option value='1'>Libre</option>
                                <option value='2'>Previa autorización</option>
                            </select>
                        </div>

                        <div class="col-md-6 col-lg-3">
                            <label for="ingreso" class="form-label"><span style="color: red">(*)</span>Fecha y hora de
                                ingreso</label>
                            <input type="datetime-local" class="form-control" id="ingreso" name="ingreso"
                                placeholder="Fecha y hora de ingreso" required>
                        </div>

                        <div class="col-md-6 col-lg-3">
                            <label for="salida" class="form-label"><span style="color: red">(*)</span>Fecha y hora de
                                salida</label>
                            <input type="datetime-local" class="form-control" name="salida" id="salida"
                                placeholder="Fecha y hora de salida" required>
                        </div>

                        <div class="col-md-6 col-lg-3">
                            <label for="infantes" class="form-label"><span style="color: red">(*)</span>Incluye
                                Infantes</label>
                            <select id="infantes" name="infantes" class="form-select" required>
                                <option selected value="">Seleccionar</option>
                                <option value='si'>Si</option>
                                <option value='no'>No</option>
                            </select>
                        </div>

                        <div class="col-md-6 col-lg-3">
                            <label for="numero_huesped" class="form-label"><span style="color: red">(*)</span>Número de
                                Huesped</label>
                            <input type="number" class="form-control" name="numero_huesped" id="numero_huesped"
                                placeholder="Número de huesped" required>
                        </div>

                        <div class='row' id="render-huesped"></div>

                        <div class="col-12">
                            <button type="button" id='btn-guardar-formulario' class="btn btn-primary"
                                style="background: #001a57">Enviar
                                Información</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </main>

    <div class="modal fade" id="modalPoliticaPrivacidad" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="title-Propietario" style="font-size: 15px"><b>POLÍTICA DE PRIVACIDAD DE DATOS PERSONALES</b></h5>
                </div>
                <div class="modal-body">
                    <p style="padding: 10px; text-align: justify">
                        Se pone en conocimiento de todos los propietarios y demás ocupantes de los edificios,
                        condominios y centros empresariales y comerciales administrados por nuestra empresa,
                        que la información y datos personales que se reciba sobre ellos será utilizada única y exclusivamente para los fines de la administración,
                        establecidos en la Ley N° 27157, su Reglamento, aprobado por Decreto Supremo N° 035-2006-VIVIENDA;
                        y por el Reglamento Interno de sus respectivas edificaciones.
                    </p>

                    <p style="padding: 10px; text-align: justify">
                        Puede acceder a toda la información de su edificación aceptando haber leído nuestra “Política de protección de datos personales” en la casilla que aparece a continuación.
                        De igual modo, puede acceder a nuestra referida Política a través del siguiente enlace: <a href="https://nexo-peru.net/politica-de-proteccion-de-datos-personales/" target="_blank"><b>Política de privacidad</b></a>
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" style="background: #001a57" data-bs-dismiss="modal">Aceptar las políticas de privacidad</button>
                </div>
            </div>
        </div>
    </div>
@endsection
