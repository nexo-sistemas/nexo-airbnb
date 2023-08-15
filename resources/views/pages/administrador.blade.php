@extends('layout.dashboard')
@section('script-page')
    @vite(['resources/js/pages/administrador.js'])
@endsection
@section('content-child')
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-lg-12 col-12">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-info-tab" data-bs-toggle="tab" data-bs-target="#nav-info"
                                type="button" role="tab" aria-controls="nav-info" aria-selected="true"
                                data-type='info'>Información</button>
                            <button class="nav-link" id="nav-fichas-tab" data-bs-toggle="tab" data-bs-target="#nav-fichas"
                                type="button" role="tab" aria-controls="nav-fichas" aria-selected="true"
                                data-type='fichas'>Fichas</button>
                            <button class="nav-link" id="nav-departamentos-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-departamentos" type="button" role="tab"
                                aria-controls="nav-departamentos" aria-selected="false" data-type='departamentos'>Unidades
                                Inmobiliarias</button>
                            <button class="nav-link" id="nav-propietarios-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-propietarios" type="button" role="tab"
                                aria-controls="nav-propietarios" aria-selected="false"
                                data-type='propietarios'>Propietarios</button>
                            <button class="nav-link" id="nav-usuarios-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-usuarios" type="button" role="tab" aria-controls="nav-usuarios"
                                aria-selected="false" data-type='usuarios'>Conserje o porteria</button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <div class="card-body ag-theme-material" style="padding: 0">
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-info" role="tabpanel" aria-labelledby="nav-info-tab"
                    tabindex="0">
                    <div id='grid-info' class="height-grid-dashboard-portero">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">NOMBRE DE LA ENTIDAD</label>
                                        <input type="text" class="form-control" id="nombre-entidad" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-fichas" role="tabpanel" aria-labelledby="nav-fichas-tab" tabindex="0">
                    <div id='grid-fichas' class="height-grid-dashboard-portero"></div>
                </div>
                <div class="tab-pane fade" id="nav-departamentos" role="tabpanel" aria-labelledby="nav-departamentos-tab"
                    tabindex="0">
                    <div class="container-fluid">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end margin-top-administrador">
                            <button class="btn btn-primary" type="button" id="btnAddUnidad">Agregar Unidad</button>
                        </div>
                    </div>

                    <div id='grid-departamentos' class="height-grid-dashboard-administrador-portero-departamento"></div>
                </div>
                <div class="tab-pane fade" id="nav-propietarios" role="tabpanel" aria-labelledby="nav-propietarios-tab"
                    tabindex="0">
                    <div class="container-fluid">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end margin-top-administrador">
                            <button class="btn btn-primary" type="button" id="btnAddPropietario">Agregar
                                Propietario</button>
                        </div>
                    </div>

                    <div id='grid-propietarios' class="height-grid-dashboard-administrador-portero-departamento"></div>
                </div>
                <div class="tab-pane fade" id="nav-usuarios" role="tabpanel" aria-labelledby="nav-usuarios-tab"
                    tabindex="0">

                    <div class="container-fluid">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end margin-top-administrador">
                            <button class="btn btn-primary" type="button" id="btnAddPortero">Agregar Portero</button>
                        </div>
                    </div>

                    <div id='grid-porteros' class="height-grid-dashboard-administrador-portero-departamento"></div>
                </div>
            </div>

        </div>
    </div>

    <x-modal-ficha-detalle></x-modal-ficha-detalle>
    <x-modal-unidad-inmobiliaria></x-modal-unidad-inmobiliaria>
    <x-modal-portero></x-modal-portero>
    <x-modal-propietarios></x-modal-propietarios>
@endsection
