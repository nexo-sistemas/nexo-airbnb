export default class ButtonDetalle {
    init(params) {
        this.eGui = document.createElement('div')
        let html_return = (!params.node.group) ?
            `
                <div class="d-flex justify-content-center">
                    <span class="badge text-bg-primary detalle-row button-grid" style="background: #001a57 !important" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Detalle."><i class="bi bi-binoculars-fill" style="font-size: 1.4em;"></i></span>
                    ${(params.userType === '2')
                ?
                '<span class="badge text-bg-primary bg-danger delete-row button-grid" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Eliminar."><i class="bi bi-trash3-fill" style="font-size: 1.4em;"></i></span>'
                :
                ''

            }
                </div>
            `
            : '';

        this.eGui.innerHTML = html_return

        if (!params.node.group) {
            this.btnDetalle = this.eGui.querySelector('.detalle-row')
            this.btnDetalle.onclick = () => params.clickedDetalle(params.data)

            if (params.userType === '2') {
                this.btnDelete = this.eGui.querySelector('.delete-row')
                this.btnDelete.onclick = () => params.clickedDelete(params.data)
            }
        }

    }

    getGui() { return this.eGui }
    refresh() { return false }
    destroy() { }
}
