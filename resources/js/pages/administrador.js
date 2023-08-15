import fichas from "../functions/fichas"
import cerrarSession from "../functions/cerrar-session"
import departamentos from "./administrador/departamentos"
import { alertMessage, form_data, nxmodal } from "../function";
import portero from "./administrador/portero";
import propietario from "./administrador/propietario";
import axios from "axios";

export default (async () => {

    window._user = JSON.parse(localStorage.getItem('_user'));
    window.agregarUnidad = false;
    window.keyUnidad = 1;
    const modalAddUnidad = nxmodal(
        document.getElementById("modalGuardarUnidad")
    );
    const modalAddPortero = nxmodal(
        document.getElementById("modalGuardarPortero")
    );

    const modalDetalle = nxmodal(
        document.getElementById("modalDetalle")
    );

    const modalPropietario = nxmodal(
        document.getElementById("modalGuardarPropietario")
    );

    getInfoEntiidad();


    const tabs = document.querySelectorAll('#nav-tab button')
    tabs.forEach(button => {
        button.addEventListener('click', async event => {
            let type = event.target.dataset.type;
            if (type === 'info') {
                getInfoEntiidad()
            } else if (type === 'fichas') {
                await fichas('2', modalDetalle)
            } else if (type === 'departamentos') {
                await departamentos(modalAddUnidad)
            } else if (type === 'usuarios') {
                await portero(modalAddPortero)
            } else if (type === 'propietarios') {
                await propietario(modalPropietario)
            }

        })
    })

    cerrarSession()

    async function getInfoEntiidad() {
        var { data } = await axios.get(`${apiURL}/entidades/${_user.keyEntidad}`);
        if ( data.ok) {
            document.getElementById('nombre-entidad').value = data.response.entidad
        }

    }

    document.getElementById('btnGuardarUnidad').addEventListener('click', async (e) => {
        const formGuardarConcepto = document.getElementById("formUnidad");
        let formConcepto = await form_data(
            document.querySelector("#formUnidad")
        );
        if (formGuardarConcepto.checkValidity()) {

            if (agregarUnidad) {
                var { data } = await axios.post(`${apiURL}/unidades`, formConcepto)
            } else {
                var { data } = await axios.put(`${apiURL}/unidades/${keyUnidad}`, formConcepto);
            }

            if (data.ok) {
                modalAddUnidad.hide();
                formGuardarConcepto.reset();
                formGuardarConcepto.classList.remove('was-validated')
                await alertMessage(
                    "success",
                    "La Unidad Inmobiliaria se guardo correctamente."
                );

                document.getElementById('nav-departamentos-tab').click();
            }
        } else {
            formGuardarConcepto.classList.add("was-validated");
        }

        e.stopPropagation()
    });

    document.getElementById('btnGuardarPropietario').addEventListener('click', async (e) => {
        const formGuardarPropietario = document.getElementById("formPropietario");
        let formPropietario = await form_data(
            document.querySelector("#formPropietario")
        );
        if (formGuardarPropietario.checkValidity()) {

            var { data } = await axios.post(`${apiURL}/propietarios`, formPropietario)

            if (data.ok) {
                modalPropietario.hide();
                formGuardarPropietario.reset();
                formGuardarPropietario.classList.remove('was-validated')
                await alertMessage(
                    "success",
                    "Los datos se guardaron correctamente."
                );

                document.getElementById('nav-propietarios-tab').click();
            }
        } else {
            formGuardarPropietario.classList.add("was-validated");
        }

        e.stopPropagation()
    });

    document.getElementById('btnGuardarPortero').addEventListener('click', async (e) => {

        const formGuardarConserje = document.getElementById("formPortero");
        let formConserje = await form_data(
            document.querySelector("#formPortero")
        );

        if (formGuardarConserje.checkValidity()) {
            var { data } = await axios.post(`${apiURL}/conserje`, formConserje);
            if (data.ok) {
                modalAddPortero.hide();
                formGuardarConserje.reset();
                formGuardarConserje.classList.remove('was-validated')
                await alertMessage(
                    "success",
                    "El usuario se guardo correctamente."
                );
                document.getElementById('nav-usuarios-tab').click();
            }
        } else {
            formGuardarConserje.classList.add("was-validated");
        }

        e.stopPropagation()

    })

    document.getElementById('foot-modal-detalle')?.addEventListener('click', async(e) => {

        if ( e.target.id === 'btnGuardarDetalleFichaAdministrador') {
            const formGuardarDetalleFicha = document.getElementById("flicha-detalle").querySelector('#formDetalleFicha');
            let formDetalleFicha = await form_data(
                document.getElementById("flicha-detalle").querySelector('#formDetalleFicha')
            );
            if (formGuardarDetalleFicha.checkValidity()) {
                const fichaID__ = document.getElementById('fichaID__').value;
                var { data } = await axios.put(`${apiURL}/ficha/administrador/update/fechas/${fichaID__}`, formDetalleFicha)

                if(data.ok === true) {

                    document.getElementById('nav-fichas-tab').click();
                    formGuardarDetalleFicha.classList.remove('was-validated')
                    modalDetalle.hide();

                    await alertMessage(
                        "success",
                        "se guardo correctamente."
                    );

                }

            } else {
                formGuardarDetalleFicha.classList.add("was-validated");
            }




        }

        e.stopPropagation()
   })

})()
