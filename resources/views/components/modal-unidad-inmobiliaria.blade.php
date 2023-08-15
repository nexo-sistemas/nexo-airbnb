<div class="modal fade" id="modalGuardarUnidad" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="title-unidad" style="font-size: 15px">Agregar Entidad</h5>
            </div>
            <div class="modal-body">
                <form class="needs-validation" id="formUnidad" novalidate>
                    <input type="hidden" name="nombre_entidad" id="nombre_entidad">
                    <input type="hidden" name="entidad_id" id="entidad_id">
                    <div class="row g-3">
                        <div class="col-12">
                            <label for="txt-departamento" class="form-label"><span style="color: red">*</span> Unidad
                                Inmobiliaria(Departamento)</label>
                            <input type="text" class="form-control" id="txt-departamento" name="departamento"
                                required>
                        </div>
                        <div class="col-12">
                            <label for="txt-propietario-enombre" class="form-label"><span style="color: red">*</span>
                                Nombre del Propietario</label>
                            <select class="form-select" aria-label="Seleccione el Propietario" name="idpropietario" id='idpropietario' required>
                                <option selected>Seleccione el Propietario</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="btnCancelarGuardarUnidad"
                    data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" style="background: #001a57"
                    id="btnGuardarUnidad">Guardar</button>
            </div>
        </div>
    </div>
</div>
