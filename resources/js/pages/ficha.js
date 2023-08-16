import huesped from "../component/huesped";
import { alertMessage, form_data, nxmodal } from "../function";

export default (async () => {

    const unidades = async (entidad, uuidUsuario) => {
        let html = `<option selected value="">Seleccionar</option>`;
        var {data} = await axios.get(`${apiURL}/unidades/${uuidUsuario}/${entidad}`);
        if( data.ok) {
            data.response.map((item) => {
                html+= `<option value="${item.id}">${item.departamento}</option>`
            })
            document.getElementById('departamento').innerHTML = html;
        }
    }

    await unidades(document.getElementById('entidad').value, document.getElementById('uuidUsuario').value);

    document.getElementById('entidad').addEventListener('change', async(e) => {
        await unidades(e.target.value, document.getElementById('uuidUsuario').value);
    })


    nxmodal(document.getElementById("modalPoliticaPrivacidad")).show();


    document.getElementById('numero_huesped').addEventListener('input', async(e) => {
        if ( parseInt(e.target.value) > 0 ) {
            let html = "";
            for (let index = 1; index <= parseInt(e.target.value); index++) {
                html+= await huesped(index)
            }
            document.getElementById('render-huesped').innerHTML = html;
        }
    });

    document.getElementById('btn-guardar-formulario').addEventListener('click', async(e) => {
        const formGuardarFicha = document.getElementById("ficha-form");
        let formFicha = await form_data(
            document.querySelector("#ficha-form")
        );
        if (formGuardarFicha.checkValidity()) {
            document.getElementById('loading-_-').classList.add('loadingActive');
            let formComprobante = new FormData(
                document.getElementById("ficha-form")
            );
            var { data } = await axios.post(`${apiURL}/ficha`, formComprobante);
            if ( data.ok ) {
                formGuardarFicha.reset();
                document.getElementById('render-huesped').innerHTML = "";
                document.getElementById('loading-_-').classList.remove('loadingActive');
                formGuardarFicha.classList.remove('was-validated')
                await alertMessage(
                    "success",
                    "Los datos se guardaron correctamente."
                );
            }
        } else {
            formGuardarFicha.classList.add("was-validated");
        }
    });



})()
