import { alertMessage, form_data, nxmodal, serialize } from "../function";
import fichas from "../functions/fichas";
import mensagge from "../functions/mensagge";
import Compressor from 'compressorjs';
import { connectionState, deleteInstance, generateQr, sendMessage } from "../functions/whatsapp-conect";
import cerrarSession from "../functions/cerrar-session";
export default (async () => {

    let formFichaDetalle;
    let adjuntoData = {};

    window._user = JSON.parse(localStorage.getItem('_user'));
    window.modalQRWhatsapp = nxmodal(
        document.getElementById("modalQRWhatsapp")
    );

    const modalDetalle = nxmodal(
        document.getElementById("modalDetalle")
    );


    document.getElementById('loading-_-').classList.add('loadingActive');
    generateQr().then((resp) => {
        document.getElementById('loading-_-').classList.remove('loadingActive');
    });
    await fichas('3', modalDetalle)

    document.getElementById('btnconectado').addEventListener('click', async () => {
        const cstate = await connectionState();
        if (cstate.status === 404) {
            alert("Whatsapp no conectado, volver a generar el QR.");
            return false;
        }
        if (cstate.state === 'connecting') {
            alert("Whatsapp no conectado, scanear QR");
            return false;
        }

        if (cstate.state === 'open') {
            modalQRWhatsapp.hide()
            await alertMessage(
                "success",
                "Whatsapp conectado"
            );
        }
    });

    document.getElementById('btnGenerarQr').addEventListener('click', async () => {
        document.getElementById('spinerCargando').classList.remove('hide--');
        const deInstance = await deleteInstance();
        setTimeout(() => {
            generateQr().then((resp) => {
                document.getElementById('spinerCargando').classList.add('hide--');
            });
        }, 1000)
    });

    document.getElementById('foot-modal-detalle')?.addEventListener('click', async (e) => {
        if (e.target.id === 'btnGuardarDetalleFichaAdministrador') {
            const formGuardarDetalleFicha = document.getElementById("flicha-detalle").querySelector('#formDetalleFicha');
            if (formGuardarDetalleFicha.checkValidity()) {
                document.getElementById('loading-_-').classList.add('loadingActive');
                const cstateValidate = await connectionState();

                console.log(cstateValidate)

                if (cstateValidate?.state === 'open') {
                    const userKey = document.getElementById('user_key__').value;

                    formFichaDetalle.append('userKey', userKey);
                    var { data } = await axios.post(`${apiURL}/ficha/portero/update/adjunto`, formFichaDetalle)
                    if (data.ok === true) {
                        formGuardarDetalleFicha.classList.remove('was-validated')
                        modalDetalle.hide();

                        let dataPropietario = JSON.parse(data.response.dataPropietario);
                        sendMessage({
                            numero: dataPropietario.numPropietario,
                            message: adjuntoData//mensagge(data.response, adjuntoData)
                        })

                        document.getElementById('loading-_-').classList.remove('loadingActive');
                        await alertMessage(
                            "success",
                            "se guardo correctamente."
                        );
                    }

                } else {

                    console.log("hola perra")
                    await deleteInstance();
                    await generateQr().then((resp) => {
                        document.getElementById('loading-_-').classList.remove('loadingActive');
                    });
                }

            } else {
                formGuardarDetalleFicha.classList.add("was-validated");
            }
        }
        e.stopPropagation()
    })



    document.getElementById("flicha-detalle").addEventListener('change', async (e) => {
        formFichaDetalle = new FormData()
        if (e.target.id === "adjunto") {
            const file = e.target.files[0];
            if (!file) {
                return;
            }
            let typeFile = file.type.split('/');
            if (typeFile[0] === "image") {
                if (file.size > 3145728) {
                    new Compressor(file, {
                        quality: 0.3,
                        success(result) {
                            formFichaDetalle.append('file', result);
                        }
                    })
                } else {
                    formFichaDetalle.append('file', file)
                }
            } else {
                formFichaDetalle.append('file', file)
            }

            console.log(serialize(formFichaDetalle))
        }

    })

    cerrarSession()

})()
