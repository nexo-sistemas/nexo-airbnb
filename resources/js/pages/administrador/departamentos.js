import { Grid } from "ag-grid-community";
import ButtonsEntidad from "../../ag-grid-render/buttonsEntidad";
import Loading from "../../ag-grid-render/loading";
import NoResult from "../../ag-grid-render/noResult";
import es from "../../es";
import { alertMessage,nxtoast } from "../../function";
export default async (modalAddUnidad) => {

    var { data } = await axios.get(`${apiURL}/unidades/propietarios/${_user.keyEntidad}`);

    console.log(data.response);

    let htmlSelectPropietarios = '<option value="">Seleccione el Propietario</option>'

    data.response.map(element => {
        htmlSelectPropietarios += `<option value="${element.id}">${element.nombre} ${element.apellido}</option>`
    });

    document.getElementById('idpropietario').innerHTML = htmlSelectPropietarios;

    document.getElementById('btnAddUnidad').addEventListener('click', () => {
        agregarUnidad = true;
        document.getElementById("formUnidad").classList.remove('was-validated')
        document.getElementById('title-unidad').innerText = 'Agregar Unidad Inmobiliaria'
        document.getElementById('entidad_id').value = _user.keyEntidad;
        document.getElementById('txt-departamento').value = '';
        modalAddUnidad.show();
    })

    const editRow = async (resp) => {
        agregarUnidad = false;
        keyUnidad = resp.uuid;
        document.getElementById("formUnidad").classList.remove('was-validated')
        document.getElementById('title-unidad').innerText = 'Editar Unidad Inmobiliaria'
        document.getElementById('entidad_id').value = _user.keyEntidad;
        document.getElementById('nombre_entidad').value = resp.entidadNombre;
        document.getElementById('txt-departamento').value = resp.departamento;
        modalAddUnidad.show();
    }

    const deleteRow = async (resp) => {
        nxtoast({
            title: "Eliminar Entidad",
            mensaje: `Desea eliminar la unidad ${resp.departamento} ?`,
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
                        var { data } = await axios.delete(`${apiURL}/unidades/${resp.uuid}`);
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

    const columnDefs = [
        { field: "entidadnombre", headerName: "Entidad Inmobiliaria", width: 350 },
        { field: "departamento", headerName: "Unidad Inmobiliaria", width: 200 },
        { field: "propietario", headerName: "Propietario", width: 350 },
        {
            field: "key",
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
            loadingMessage: "Cargando Unidades...",
        },
        noRowsOverlayComponent: NoResult,
        localeText: es.ag_grid,

    };

    const gridDiv = document.querySelector("#grid-departamentos");
    gridDiv.innerHTML = "";
    new Grid(gridDiv, gridOptions);
    var { data } = await axios.get(`${apiURL}/unidades?e=${_user.keyEntidad}`);
    gridOptions.api.setRowData(data.response);
    document.querySelector('.ag-watermark').remove()
}
