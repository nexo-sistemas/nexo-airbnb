<div class="modal fade" id="modalQRWhatsapp" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Escanear QR</h5>
            </div>
            <div class="modal-body">

                <div class="d-flex justify-content-center" >
                    <div class="spinner-border hide--" style="width: 3rem; height: 3rem;" role="status" id='spinerCargando'>
                      <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

                <div id="qr-whatsapp"></div>

            </div>
            <div class="modal-footer" id="foot-modal-detalle">

                <button type="button" class="btn btn-secondary" id="btnCancelarGuardarEntidad"
                    data-bs-dismiss="modal">Cerrar</button>

                    <button type="button" class="btn btn-secondary" id="btnGenerarQr" style="background: #001a57" >Generar QR</button>

                    <button type="button" class="btn btn-success" id="btnconectado">Connectado</button>
            </div>
        </div>
    </div>
</div>
