import { Grid } from "ag-grid-community";
import es from './../es';
import NoResult from "../ag-grid-render/noResult";
import Loading from "../ag-grid-render/loading";
import { alertMessage, form_data, nxmodal, nxtoast } from "../function";
import ButtonsEntidad from "../ag-grid-render/buttonsEntidad";

export default (async () => {
    let agregar = false, keyEntidad;
    const modalAddEntidad = nxmodal(
        document.getElementById("modalAddEntidad")
    );
    document.getElementById('add_entidad').addEventListener('click', () => {
        agregar = true;
        document.getElementById('title-entidad').innerText = 'Agregar entidad'
        document.getElementById('txt-entidad-nombre').value = '';
        document.getElementById('txt-entidad-usuario').value = '';
        document.getElementById('txt-entidad-password').value = '';
        modalAddEntidad.show();
    })

    document.getElementById('btnGuardarEntidad').addEventListener('click', async () => {
        const formGuardarConcepto = document.getElementById("formEntidad");
        let formConcepto = await form_data(
            document.querySelector("#formEntidad")
        );
        if (formGuardarConcepto.checkValidity()) {
            if (agregar) {
                var { data } = await axios.post(`${apiURL}/entidades`, formConcepto)
            } else {
                var { data } = await axios.put(`${apiURL}/entidades/${keyEntidad}`, formConcepto);
            }
            if (data.ok) {
                modalAddEntidad.hide();
                formGuardarConcepto.reset();
                formGuardarConcepto.classList.remove('was-validated')
                await alertMessage(
                    "success",
                    "La entidad se guardo, correctamente."
                );

                let transaction = agregar
                    ? { add: [data.response] }
                    : { update: [data.response] };
                gridOptions.api.applyTransaction(transaction);
            }
        } else {
            formGuardarConcepto.classList.add("was-validated");
        }
    });

    const deleteRow = async (resp) => {
        nxtoast({
            title: "Eliminar Entidad",
            mensaje: `Desea eliminar la entidad ${resp.nombre} ?`,
            button: [
                {
                    title: "cerrar",
                    class: "btn btn-secondary btn-sm",
                    function: 'data-bs-dismiss="toast"',
                    callback: false,
                },
                {
                    title: "Aceptar",
                    class: "btn btn-primary btn-sm",
                    style: "background: #001a57;",
                    id: "btn-toast-aceptar",
                    callback: async () => {
                        var { data } = await axios.delete(`${apiURL}/entidades/${resp.uuid}`);
                        if (data.ok) {
                            gridOptions.api.applyTransaction({
                                remove: [{ uuid: resp.uuid }],
                            });
                            await nxtoast({
                                hide: true,
                            });
                            await alertMessage(
                                "success",
                                "Periodo eliminado con exito"
                            );
                        }
                    },
                },
            ],
            show: true,
        });
    };

    const editRow = async (resp) => {
        agregar = false;
        keyEntidad = resp.uuid;
        document.getElementById('title-entidad').innerText = 'Editar entidad'
        document.getElementById('txt-entidad-nombre').value = resp.nombre
        document.getElementById('txt-entidad-usuario').value = resp.usuario;
        document.getElementById('txt-entidad-password').value = resp.password;
        modalAddEntidad.show();
    }

    const columnDefs = [
        { field: "nombre", headerName: "Nombre", width: 350 },
        { field: "usuario", headerName: "Usuario Administrador", width: 200 },
        { field: "password", headerName: "Password Administrador", width: 200 },
        {
            field: "uuid",
            headerName: "Acciones",
            width: 50,
            pinned: "right",
            cellRenderer: ButtonsEntidad,
            cellRendererParams: {
                clickedDelete: (data) => {
                    deleteRow(data);
                },

                clickedEdit: (data) => {
                    editRow(data);
                },

                clickedUsuario: (data) => {
                    console.log(data)
                }
            },
        },
    ];

    const gridOptions = {
        columnDefs: columnDefs,
        getRowId: (params) => params.data.uuid,
        defaultColDef: {
            sortable: true,
            filter: false,
            resizable: true,
            minWidth: 160,
            flex: 1,
        },
        pagination: false,
        loadingOverlayComponent: Loading,
        loadingOverlayComponentParams: {
            loadingMessage: "Cargando Conceptos...",
        },
        noRowsOverlayComponent: NoResult,
        localeText: es.ag_grid,
    };

    const gridDiv = document.querySelector("#myGrid");
    new Grid(gridDiv, gridOptions);
    gridOptions.api.setRowData([]);
    var { data } = await axios.get(`${apiURL}/entidades`);
    gridOptions.api.setRowData(data.response);

    //logaut
    document.getElementById('salir-session-login').addEventListener('click', function () {
        axios.post(`${apiURL}/auth/logout`).then((result) => {
            if (result.data.ok) {
                localStorage.removeItem('_user')
                window.location.href = '/'
            }
        }).catch((err) => {
            console.log(err)
        })
    });

    document.getElementById('btnCancelarGuardarEntidad').addEventListener('click', async () => {
        document.getElementById("formEntidad").classList.remove('was-validated')
    });

})();
