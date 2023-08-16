import { Grid } from "ag-grid-community";
import { alertMessage, nxmodal, nxtoast } from "../function";
import ButtonDetalle from './../ag-grid-render/buttonDetalle';
import Loading from './../ag-grid-render/loading';
import NoResult from './../ag-grid-render/noResult';
import es from './../es';
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import fichaDetalle from "../component/fichaDetalle";

export default async (userType = '3', modalDetalle) => {

    function cellClass(params) {
       if (params.value) {
            return ( (params.data.principal) && params.data.principal === 'SI' ) ? 'rag-green' : '';
       }
    }

    let filterParams = {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
            var dateAsString = cellValue;
            if (dateAsString == null) return -1;
            var dateParts = dateAsString.split('/');
            var cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[1]) - 1,
                Number(dateParts[0])
            );

            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
            }

            if (cellDate < filterLocalDateAtMidnight) {
                return -1;
            }

            if (cellDate > filterLocalDateAtMidnight) {
                return 1;
            }
            return 0;
        },
        minValidYear: 2023,
        maxValidYear: 2025,
        inRangeFloatingFilterDateFormat: 'Do MMM YYYY',
    };

    const deleteRow = async (resp) => {
        nxtoast({
            title: "Eliminar Ficha",
            mensaje: `Desea eliminar el registro ?`,
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
                        var { data } = await axios.delete(`${apiURL}/ficha/${resp.fichaid}`);
                        if (data.ok) {
                            console.log(resp.fichaid)
                            gridOptions.api.applyTransaction({
                                remove: [{ fichaid: resp.fichaid }],
                            });
                            await nxtoast({
                                hide: true,
                            });
                            await alertMessage(
                                "success",
                                "Registro eliminado con exito"
                            );
                        }
                    },
                },
            ],
            show: true,
        });
    };


    let administrador__ = (userType === '2') ? true : false;

    const columnDefs = [
        { field: "departamento", headerName: "Departamento", width: 180, rowGroup: true, hide: false, cellClass: cellClass },
        { field: "usuario", headerName: "Usuario", width: 300, cellClass: cellClass },
        { field: "tipodocumento", headerName: "Tipo de documento", width: 200, cellClass: cellClass },
        { field: "numero_documento", headerName: "Documento", width: 200, cellClass: cellClass },
        { field: "ingreso", headerName: "Ingreso", width: 200, filter: 'agDateColumnFilter', filterParams: filterParams, cellClass: cellClass },
        { field: "salida", headerName: "Salida", width: 200, filter: 'agDateColumnFilter', filterParams: filterParams, cellClass: cellClass },
        {
            field: "fichaid",
            headerName: "Acciones",
            width: 30,
            pinned: "right",
            filter: false,
            cellRenderer: ButtonDetalle,
            cellRendererParams: {
                userType: userType,
                clickedDetalle: async (data) => {
                    var { data } = await axios.get(`${apiURL}/ficha/${data.users_id}`);
                    document.getElementById('flicha-detalle').innerHTML = await fichaDetalle(data.response, administrador__, data.unidades)
                    modalDetalle.show()
                },
                clickedDelete: async (data) => {
                    deleteRow(data)
                }
            },
        },
    ];


    let defaultColDef = (userType == '2') ?{sortable: true,filter: true,floatingFilter: true,resizable: true,minWidth: 180,flex: 1}:
                        (screen.width > 1500 ) ? {sortable: true,filter: true,floatingFilter: true,resizable: true,minWidth: 180,flex: 1}: {sortable: true,filter: true,floatingFilter: true,resizable: true};

    const gridOptions = {
        columnDefs: columnDefs,
        getRowId: (params) => params.data.fichaid,
        defaultColDef: defaultColDef,
        autoGroupColumnDef: {
            width: 150,
        },
        pagination: true,
        loadingOverlayComponent: Loading,
        loadingOverlayComponentParams: {
            loadingMessage: "Cargando la Data...",
        },
        groupDisplayType: 'singleColumn',
        groupDefaultExpanded: 1,
        animateRows: true,
        noRowsOverlayComponent: NoResult,
        localeText: es.ag_grid,
    };

    const gridDiv = document.querySelector("#grid-fichas");
    gridDiv.innerHTML = "";
    new Grid(gridDiv, gridOptions, { modules: [RowGroupingModule] });
    var { data } = await axios.get(`${apiURL}/ficha?e=${_user.keyEntidad}`);
    gridOptions.api.setRowData(data.response);
    document.querySelector('.ag-watermark').remove()

}
