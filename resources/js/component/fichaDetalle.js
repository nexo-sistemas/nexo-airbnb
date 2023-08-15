export default async (resp, administrador = false, dataDepartamentos = []) => {
    if (administrador) {
        document.getElementById('foot-modal-detalle').innerHTML = `
            <button type="button" class="btn btn-secondary" id="btnCancelarGuardarEntidad" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" style="background: #001a57" id="btnGuardarDetalleFichaAdministrador">Guardar</button>
        `
    } else {
        document.getElementById('foot-modal-detalle').innerHTML = `
            <button type="button" class="btn btn-secondary" id="btnCancelarGuardarEntidad" data-bs-dismiss="modal">Cerrar</button>
            ${ (!resp.adjunto_conserje) ? '<button type="button" class="btn btn-primary" style="background: #001a57" id="btnGuardarDetalleFichaAdministrador">Guardar</button>' : '' }
        `
    }


    let content_adjunto;


    if ( administrador ) {
        content_adjunto = `
            ${ (resp.adjunto_conserje) ?
                `<div class="col-md-12">
                    <span style="font-size: 13px"><b>Recepción de llegada</b></span>
                </div>
                <hr style="margin-bottom: 10px !important">
                
                <div class="col-md-6 col-lg-6">
                    <label for="numero_documento" class="form-label">Fecha y Hora de LLegada del Huesped</label>
                    <input type="text" class="form-control" value="${resp.hora_ingreso}" disabled="disabled">
                </div>
                <div class="col-md-6 col-lg-6 mt-3">
                    <div class="d-grid d-md-flex justify-content-md-end">
                        <a href="/s?archive=${resp.adjunto_conserje}" target="_blank" class="btn btn-primary btn-sm" type="button" >
                                Ver documento
                        </a>
                    </div>
                </div>
                `
                : ''
            }
        `
    } else {
       
        content_adjunto = `
            ${ (resp.adjunto_conserje) ?
                `<div class="col-md-12">
                    <span style="font-size: 13px"><b>Recepción de llegada</b></span>
                </div>
                <hr style="margin-bottom: 10px !important">
                
                <div class="col-md-6 col-lg-6">
                    <label for="numero_documento" class="form-label">Fecha y Hora de LLegada del Huesped</label>
                    <input type="text" class="form-control" value="${resp.hora_ingreso}" disabled="disabled">
                </div>
                <div class="col-md-6 col-lg-6 mt-3">
                    <div class="d-grid d-md-flex justify-content-md-end">
                        <a href="/s?archive=${resp.adjunto_conserje}" target="_blank" class="btn btn-primary btn-sm" type="button" >
                                Ver documento
                        </a>
                    </div>
                </div>
                `
                : 
                `
                <div class="col-md-12">
                    <span style="font-size: 13px"><b>Recepción de llegada</b></span>
                </div>
                <hr style="margin-bottom: 10px !important">
                <div class="col-md-6 col-lg-6">
                    <label for="adjunto" class="form-label">Adjuntar documento</label>
                    <div class="input-group">
                        <input type="file" class="form-control adjunto-ficha" id="adjunto" required>
                    </div>
                </div>
                `
            }
        `
    }

    return `
        <form class="needs-validation" id="formDetalleFicha" novalidate="">
            <input type="hidden" name="fichaID" id="fichaID__" value="${resp.fichaID}">
            <input type="hidden" name="user_key__" id="user_key__" value="${resp.users_key}">
            <div class="row">
                <div class="col-md-6 col-lg-3">
                    <label for="departamento" class="form-label"><span style="color: red">(*)</span>Departamento</label>
                    <input type="text" class="form-control" value="${resp.departamento}" disabled="disabled">
                </div>
                <div class="col-md-6 col-lg-3">
                    <label for="estacionamiento" class="form-label">Cochera(en caso aplique)</label>
                    <input type="text" class="form-control" value="${resp.estacionamiento}" disabled="disabled">
                </div>
                <div class="col-md-6 col-lg-3">
                    <label for="numero_placa" class="form-label">Número de Placa</label>
                    <input type="text" class="form-control" value="${resp.numero_placa}" disabled="disabled">
                </div>
                <div class="col-md-6 col-lg-3">
                    <label for="visitas" class="form-label">Autorización de Visitas </label>
                    <input type="text" class="form-control" value="${resp.visita}" disabled="disabled">
                </div>

                <div class="col-md-6 col-lg-3">
                    <label for="ingreso" class="form-label">Fecha y hora de ingreso</label>
                    <input type="datetime-local" name="ingreso" class="form-control" value="${resp.ingreso}" disabled="disabled">
                </div>

                <div class="col-md-6 col-lg-3">
                    <label for="salida" class="form-label">Fecha y hora de salida</label>
                    <input type="datetime-local" name="salida" class="form-control" value="${resp.salida}" ${(administrador) ? '' : 'disabled="disabled" required'}>
                </div>

                <div class="col-md-6 col-lg-3">
                    <label for="infantes" class="form-label">Incluye niños?</label>
                    <input type="text" class="form-control" value="${resp.infantes}" disabled="disabled">
                </div>

                <div class="col-md-6 col-lg-3">
                    <label for="numero_huesped" class="form-label">Número de Huesped</label>
                    <input type="number" class="form-control" value="${resp.numero_huesped}" disabled="disabled">
                </div>

                <div class="col-md-12" style="margin-top: 10px">
                    <span style="font-size: 13px"><b> Huesped </b></span>
                </div>
                <hr style="margin-bottom: 10px !important">
                <div class="col-md-6 col-lg-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" value="${resp.nombre}" disabled="disabled">
                </div>
                <div class="col-md-6 col-lg-3">
                    <label  class="form-label">Apellido</label>
                    <input type="text" class="form-control" value="${resp.apellido}" disabled="disabled">
                </div>
                <div class="col-md-6 col-lg-3">
                    <label class="form-label">Tipo de Documento</label>
                    <input type="text" class="form-control"  value="${resp.tipodocumento}" disabled="disabled">
                </div>
                <div class="col-md-6 col-lg-3">
                    <label for="numero_documento" class="form-label">Número de
                        Documento</label>
                    <input type="text" class="form-control" value="${resp.numero_documento}" disabled="disabled">
                </div>

                <div class="col-md-6 col-lg-6 mt-3">
                    <div class="d-grid d-md-flex justify-content-md-end">
                        ${ (resp.adjunto) ? 
                            `<a href="/s?archive=${resp.adjunto}" target="_blank" class="btn btn-primary btn-sm" type="button" >
                                Ver documento
                            </a>`
                            :
                            ''
                        } 
                    </div>
                </div>
                ${content_adjunto}
            </div>
        </form>
    `
}