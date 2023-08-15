import { Grid } from "ag-grid-community";
import ButtonsPropietario from "../../ag-grid-render/buttonsPropietario";
import Loading from "../../ag-grid-render/loading";
import NoResult from "../../ag-grid-render/noResult";
import es from "../../es";
import { alertMessage, nxtoast } from "../../function";

export default async (modalPropietario) => {

    document.getElementById('btnAddPropietario').addEventListener('click', () => {
        agregarUnidad = true;
        document.getElementById("formPropietario").reset();
        document.getElementById('propietario_uuid').value = '';
        document.getElementById('datos-propietario').style.display = 'none';
        document.getElementById("formPropietario").classList.remove('was-validated')
        document.getElementById('title-unidad').innerText = 'Agregar Propietario'
        document.getElementById('entidad_id_propietario').value = _user.keyEntidad;
        modalPropietario.show();
    })

    document.getElementById('celular-propietario').addEventListener('input', async (e) => {
        const phone = e.target.value;
        const codigo = document.getElementById('codigo-celular')
        if (e.target.value.length > 8) {
            if (codigo.value.length === 0) {
                await alertMessage(
                    "danger",
                    "Ingresar el código del pais"
                );
                return;
            }
            const number= codigo.value + phone;
            var { data } = await axios.get(`${apiURL}/propietarios/phone/${number}`);
            if(data.response) {
                document.getElementById('propietario_uuid').value = data.response.uuid;
                document.getElementById('propietario-nombre').value = data.response.nombre;
                document.getElementById('propietario-apellido').value = data.response.apellido;
                document.getElementById('datos-propietario').style.display = 'block';
            } else {
                document.getElementById('datos-propietario').style.display = 'block';
            }
        }
    });

    const deleteRow = async (resp) => {
        nxtoast({
            title: "Eliminar Propietario",
            mensaje: `Desea eliminar al propietario ${resp.nombre} ${resp.apellido} ?`,
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
                        var { data } = await axios.delete(`${apiURL}/propietarios/${resp.uuid}`);
                        if (data.ok) {
                            gridOptions.api.applyTransaction({
                                remove: [{ uuid: resp.uuid }],
                            });
                            await nxtoast({
                                hide: true,
                            });
                            await alertMessage(
                                "success",
                                "Propietario eliminado con exito"
                            );
                        }
                    },
                },
            ],
            show: true,
        });
    };

    const columnDefs = [
        { field: "nombre", headerName: "Nombre", width: 350 },
        { field: "apellido", headerName: "Apellido", width: 350 },
        { field: "celular", headerName: "Celular", width: 200 },
        {
            field: "link", headerName: "Link del Formulario", width: 350,
            cellRenderer: (resp) => {
                return `<a  href="${URLAPP}/login-propietario?u=${resp.data.uuid}" target="_blank" style='color: blue'>${URLAPP}/login-propietario?u=${resp.data.uuid}</a>`
            }
        },
        {
            field: "key",
            headerName: "Acciones",
            width: 50,
            pinned: "right",
            cellRenderer: ButtonsPropietario,
            cellRendererParams: {
                clickedDelete: (data) => {
                    deleteRow(data)
                },
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
        pagination: true,
        loadingOverlayComponent: Loading,
        loadingOverlayComponentParams: {
            loadingMessage: "Cargando Propietarios ...",
        },
        noRowsOverlayComponent: NoResult,
        localeText: es.ag_grid,
    };

    const gridDiv = document.querySelector("#grid-propietarios");
    gridDiv.innerHTML = "";
    new Grid(gridDiv, gridOptions);
    var { data } = await axios.get(`${apiURL}/propietarios?e=${_user.keyEntidad}`);
    gridOptions.api.setRowData(data.response);
    document.querySelector('.ag-watermark').remove()
}
