export default async (numero) => {
   return `
    <div class="col-md-12" style="margin-top: 15px">
        <span style="font-size: 13px"><b> Huesped ${numero}</b></span>
    </div>
    <hr style="margin-bottom: 15px !important">
    <div class="col-md-6 col-lg-3">
        <label for="nombre-${numero}" class="form-label"><span style="color: red">(*)</span>Nombre</label>
        <input type="text" class="form-control" id="nombre-${numero}" name="nombre-${numero}" placeholder="Nombre" required>
    </div>
    <div class="col-md-6 col-lg-3">
        <label for="apellido-${numero}" class="form-label">Apellido</label>
        <input type="text" class="form-control" id="apellido-${numero}" name="apellido-${numero}" placeholder="Apellido">
    </div>

    <!--
    <div class="col-md-6 col-lg-3">
        <label for="tipo_nacionalidad-${numero}" class="form-label"><span style="color: red">(*)</span>Nacionalidad</label>
        <select id="tipo_nacionalidad-${numero}" name="tipo_nacionalidad-${numero}" class="form-select" required>
            <option selected value="">Seleccionar</option>
            <option value="2">DNI</option>
            <option value="4">RUC</option>
            <option value="5">PASAPORTE</option>
            <option value="6">CARNET DE EXTRANJERÍA</option>
        </select>
    </div>
    -->
    <div class="col-md-6 col-lg-3">
        <label for="tipo_documento_id-${numero}" class="form-label"><span style="color: red">(*)</span>Tipo de Documento</label>
        <select id="tipo_documento_id-${numero}" name="tipo_documento_id-${numero}" class="form-select" required>
            <option selected value="">Seleccionar</option>
            <option value="2">DNI</option>
            <option value="4">RUC</option>
            <option value="5">PASAPORTE</option>
            <option value="6">CARNET DE EXTRANJERÍA</option>
        </select>
    </div>

    <div class="col-md-6 col-lg-3">
        <label for="numero_documento-${numero}" class="form-label"><span style="color: red">(*)</span>Número de
            Documento</label>
        <input type="text" class="form-control" id="numero_documento-${numero}" name="numero_documento-${numero}" placeholder="Número de Documento" required>
    </div>

    <div class="col-md-6 col-lg-3">
        <label for="nacionalidad-${numero}" class="form-label">Nacionalidad</label>
        <input type="text" class="form-control" id="nacionalidad-${numero}" name="nacionalidad-${numero}" placeholder="Nacionalidad">
    </div>

    <div class="col-md-6 col-lg-3">
        <label for="principal-${numero}" class="form-label">Huesped principal</label>
        <select id="principal-${numero}" name="principal-${numero}" class="form-select" required>
            <option selected value="NO">NO</option>
            <option value="SI">SI</option>
        </select>
    </div>

    <!--
        <div class="col-md-6 col-lg-6">
            <label for="adjunto-${numero}" class="form-label">Adjuntar documento</label>
            <div class="input-group">
                <input type="file" class="form-control" id="adjunto-${numero}" name="adjunto-${numero}">
            </div>
        </div>
    -->
   `
}
