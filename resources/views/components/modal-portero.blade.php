<div class="modal fade" id="modalGuardarPortero" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="title-portero" style="font-size: 15px"> Agregar Conserje</h5>
            </div>
            <div class="modal-body">
                <form class="needs-validation" id="formPortero" novalidate>
                    <input type="hidden" name="entidad_id" id="entidad_id_concerje">
                    <div class="row g-3">
                        <div class="col-12" style="display: none;">
                            <label for="txt-portero-nombre" class="form-label"><span style="color: red">*</span> Nombre</label>
                            <input type="hidden" class="form-control" id="txt-portero-nombre" name="nombre" value='CONSERJE'>
                        </div>
                        <div class="col-12" style="display: none;">
                            <label for="txt-portero-apellido" class="form-label">Apellido</label>
                            <input type="hidden" class="form-control" id="txt-portero-apellido" name="apellido" >
                        </div>
                        <div class="col-12 position-relative">
                            <label for="txt-portero-user" class="form-label"><span style="color: red">*</span>usuario</label>
                            <input type="text" class="form-control usuario-validate-existing-input" id="txt-portero-user" name="user" required>
                            <div class="invalid-tooltip usuario-validate-existing"></div>
                        </div>

                        <div class="col-12">
                            <label for="txt-portero-password" class="form-label"><span style="color: red">*</span>Password</label>
                            <input type="password" class="form-control" id="txt-portero-password" name="password" required>
                        </div>

                        <div class="col-12">
                            <label for="txt-portero-celular" class="form-label"><span style="color: red">*</span>Celular</label>
                            <input type="number" class="form-control" id="txt-portero-celular" name="celular" required>
                        </div>

                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="btnCancelarGuardarPortero" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" style="background: #001a57" id="btnGuardarPortero">Guardar</button>
            </div>
        </div>
    </div>
</div>
