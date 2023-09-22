import moment from "moment/moment"
import { listarObservaciones } from "../function"

export default async (resp, administrador = false, dataDepartamentos = []) => {


    console.log(resp)





    if (administrador) {
        document.getElementById('foot-modal-detalle').innerHTML = `
            <button type="button" class="btn btn-secondary" id="btnCancelarGuardarEntidad" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" style="background: #001a57" id="btnGuardarDetalleFichaAdministrador">Guardar</button>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" data-fichaID="${resp.fichaID}">Observaciones</button>
        `
    } else {
        document.getElementById('foot-modal-detalle').innerHTML = `
            <button type="button" class="btn btn-secondary" id="btnCancelarGuardarEntidad" data-bs-dismiss="modal">Cerrar</button>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" data-fichaID="${resp.fichaID}">Observaciones</button>
        `

        document.getElementById('formulario__').innerHTML = `
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Ingresar Observación</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <button type="button" class="btn btn-primary mt-4" style="background: #001a57" id="btnGuardarObservacion">Guardar Observación</button>
            </div>
        `
    }


    let content_adjunto_llegada;
    let content_adjunto_salida;

    if (administrador) {
        content_adjunto_llegada = `
            ${(resp.hora_ingreso) ?
                `<div class="col-md-12">
                    <span style="font-size: 13px"><b>Recepción de llegada</b></span>
                </div>
                <hr style="margin-bottom: 10px !important">

                <div class="col-md-6 col-lg-6">
                    <label for="numero_documento" class="form-label">Fecha y Hora de LLegada del Huesped</label>
                    <input type="text" class="form-control" value="${resp.hora_ingreso}" disabled="disabled">
                </div>
                <div class="col-md-6 col-lg-6 mt-3" style="display: ${(resp.adjunto_conserje) ? 'block' : 'none' }">
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

        content_adjunto_salida = `
            ${(resp.hora_salida) ?
                `<div class="col-md-12 mt-3">
                    <span style="font-size: 13px"><b>Recepción de Salida</b></span>
                </div>
                <hr style="margin-bottom: 10px !important">

                <div class="col-md-6 col-lg-6">
                    <label for="numero_documento" class="form-label">Fecha y hora de salida del huesped</label>
                    <input type="datetime-local" class="form-control" value="${resp.hora_salida}" disabled="disabled">
                </div>
                `
                : ''
            }
        `
    } else {

        content_adjunto_llegada = `
            ${(resp.hora_ingreso) ?
                `<div class="col-md-12">
                    <span style="font-size: 13px"><b>Recepción de llegada</b></span>
                </div>
                <hr style="margin-bottom: 10px !important">

                <div class="col-md-6 col-lg-6">
                    <label for="numero_documento" class="form-label">Fecha y Hora de LLegada del Huesped</label>
                    <input type="text" class="form-control" value="${resp.hora_ingreso}" disabled="disabled">
                </div>
                <div class="col-md-6 col-lg-6 mt-3" style="display: ${(resp.adjunto_conserje) ? 'block' : 'none' }">
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
                <div class="col-md-6 col-lg-6" style='display : ${ (resp.permitir_adjunto == 1) ? "block" : "none" }'>
                    <label for="adjunto" class="form-label">Adjuntar documento</label>
                    <div class="input-group">
                        <input type="file" class="form-control adjunto-ficha" accept="image/*" capture="camera" id="adjunto">
                    </div>
                </div>

                <div class="col-md-6 col-lg-6" style='display : ${ (resp.permitir_adjunto == 1) ? "none" : "block" }'>
                    <label for="numero_documento" class="form-label">Fecha y hora de Ingreso del huesped</label>
                    <input type="datetime-local" class="form-control" value="${moment().format('YYYY-MM-DDTHH:mm')}" disabled="disabled">
                </div>

                <div class="col-md-6 col-lg-6">
                        <center><button type="button" class="btn btn-primary mt-4" style="background: #001a57" id="btnGuardarDetalleFichaAdministrador">Guardar Fecha de Entrada</button></center>
                </div>
                `
            }
        `
        content_adjunto_salida = `
                ${(resp.hora_salida) ?
                `<div class="col-md-12 mt-3">
                        <span style="font-size: 13px"><b>Recepción de Salida</b></span>
                    </div>
                    <hr style="margin-bottom: 10px !important">

                    <div class="col-md-6 col-lg-6">
                        <label for="numero_documento" class="form-label">Fecha y hora de salida del huesped</label>
                        <input type="datetime-local" class="form-control" value="${resp.hora_salida}" disabled="disabled">
                    </div>
                    `
                :
                `
                    <div class="col-md-12 mt-3">
                        <span style="font-size: 13px"><b>Recepción de Salida</b></span>
                    </div>
                    <hr style="margin-bottom: 10px !important">

                    <div class="col-md-6 col-lg-6">
                        <label for="numero_documento" class="form-label">Fecha y hora de salida del huesped</label>
                        <input type="datetime-local" class="form-control" id="fecha_salida_huesped"required>
                    </div>

                    <div class="col-md-6 col-lg-6">
                        <center><button type="button" class="btn btn-primary mt-4" style="background: #001a57" id="btnGuardarFechaSalida">Guardar Fecha de Salida</button></center>
                    </div>
                    `
            }
            `

    }

    await listarObservaciones(resp.fichaID);

    return `
        <form class="needs-validation" id="formDetalleFicha" novalidate="">
            <input type="hidden" id='permitir-adjunto' name='permitirAdjunto' value="${resp.permitir_adjunto}">
            <input type="hidden" name="fichaID" id="fichaID__" value="${resp.fichauuid}">
            <input type="hidden" id="_fichaID_" value="${resp.fichaID}">
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
                <div class="col-md-6 col-lg-3">
                    <label for="nacionalidad" class="form-label">Nacionalidad</label>
                    <input type="text" class="form-control" value="${resp.nacionalidad ?? ''}" disabled="disabled">
                </div>

                <div class="col-md-6 col-lg-6 mt-3">
                    <div class="d-grid d-md-flex justify-content-md-end">
                        ${(resp.adjunto) ?
            `<a href="/s?archive=${resp.adjunto}" target="_blank" class="btn btn-primary btn-sm" type="button" >
                                Ver documento
                            </a>`
            :
            ''
        }
                    </div>
                </div>
                ${content_adjunto_llegada}
                ${content_adjunto_salida}
            </div>
        </form>
    `



}
