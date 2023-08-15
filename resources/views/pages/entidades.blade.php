@extends('layout.dashboard')
@section('script-page')
    @vite(['resources/js/pages/entidad.js'])
@endsection
@section('title', 'Dashboard - Entidad Inmobiliaria')
@section('content-child')
    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-6 d-flex align-items-center">
                    <h6 class="mb-0">Entidad Inmobiliaria</h6>
                </div>
                <div class="col-6 text-end">
                    <button class="btn btn-sm mb-0" style='background: #78b70b;color: #fff;' id='add_entidad'>Agregar
                        Entidad</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="ag-theme-material" id="myGrid" style="height: calc(100vh - 220px);padding:0"></div>
        </div>
    </div>

    <div class="modal fade" id="modalAddEntidad" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="title-entidad" style="font-size: 15px">Agregar Entidad</h5>
                </div>
                <div class="modal-body">
                    <form class="needs-validation" id="formEntidad" novalidate>
                        <div class="row g-3">
                            <div class="col-12">
                                <label for="txt-entidad-nombre" class="form-label">* Nombre</label>
                                <input type="text" class="form-control" id="txt-entidad-nombre" name="nombre" required>
                            </div>

                            <div class="col-12 position-relative">
                                <label for="txt-entidad-usuario" class="form-label">* Usuario</label>
                                <input type="text" class="form-control usuario-validate-existing-input" id="txt-entidad-usuario" name="usuario" required>
                                <div class="invalid-tooltip usuario-validate-existing"></div>
                            </div>

                            <div class="col-12">
                                <label for="txt-entidad-password" class="form-label">* Password</label>
                                <input type="text" class="form-control" id="txt-entidad-password" name="password"
                                    required>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnCancelarGuardarEntidad"
                        data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" style="background: #001a57"
                        id="btnGuardarEntidad">Guardar</button>
                </div>
            </div>
        </div>
    </div>

@endsection
