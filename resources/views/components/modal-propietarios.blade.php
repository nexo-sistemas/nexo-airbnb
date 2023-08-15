<div class="modal fade" id="modalGuardarPropietario" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="title-Propietario" style="font-size: 15px">Agregar Propietario</h5>
            </div>
            <div class="modal-body">
                <form class="needs-validation" id="formPropietario" novalidate>
                    <input type="hidden" name="nombre_entidad" id="nombre_entidad_propietario">
                    <input type="hidden" name="entidad_id" id="entidad_id_propietario">
                    <input type="hidden" name="propietario_uuid" id="propietario_uuid">
                    <div class="row g-3" id="celular-contacto">
                        <div class="col-3">
                            <label for="txt-propietario-celular" class="form-label"><span style="color: red">*</span>
                                Código País</label>
                            <input type="number" class="form-control" name="codigoCelular" id="codigo-celular" required>
                        </div>
                        <div class="col-9">
                            <label for="txt-propietario-celular" class="form-label"><span style="color: red">*</span>
                                Celular del Propietario</label>
                            <input type="number" class="form-control" name="celular" id="celular-propietario" required>
                        </div>
                    </div>
                    <div class="row g-3" id="datos-propietario" style="display: none">
                        <div class="col-12">
                            <label for="txt-propietario-enombre" class="form-label"><span style="color: red">*</span>
                                Nombre del Propietario</label>
                            <input type="text" class="form-control" name="nombre" id="propietario-nombre" required>
                        </div>
                        <div class="col-12">
                            <label for="txt-propietario-apellido" class="form-label">Apellido del Propietario</label>
                            <input type="text" class="form-control" name="apellido" id="propietario-apellido">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="btnCancelarGuardarPropietario"
                    data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" style="background: #001a57"
                    id="btnGuardarPropietario">Guardar</button>
            </div>
        </div>
    </div>
</div>
