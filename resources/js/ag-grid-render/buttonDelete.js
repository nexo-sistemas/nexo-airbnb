export default class ButtonDelete {
    init(params) {
        this.eGui = document.createElement('div')
        this.eGui.innerHTML = `
            <div class="d-flex justify-content-center">
                <span class="badge text-bg-primary bg-danger delete-row button-grid" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Eliminar."><i class="bi bi-trash3-fill" style="font-size: 1.4em;"></i></span>
            </div>
        `
        this.btnDelete = this.eGui.querySelector('.delete-row')
        this.btnDelete.onclick = () => params.clickedDelete(params.data)

    }

    getGui() { return this.eGui }
    refresh() { return false }
    destroy() { }
}
