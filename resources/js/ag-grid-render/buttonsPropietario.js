export default class ButtonsPropietario {
    init(params) {
        console.log(params.data);
        this.eGui = document.createElement('div')
        this.eGui.innerHTML = `
            <div class="d-flex justify-content-center">
                <span class="badge text-bg-primary bg-danger delete-row button-grid" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Eliminar."><i class="bi bi-trash3-fill" style="font-size: 1.4em;"></i></span>
                <a href="https://api.whatsapp.com/send?phone=${params.data.celular}&text=Hola,%0Ale comparto el link del formulario de RIT,%0Adonde podrá registrar los datos de su Huésped.%0A%0A%0A${URLAPP}/?u=${params.data.uuid}" target="_blank"
                   class="badge btn-success button-grid" style="background: #82d616 !important" data-bs-toggle="tooltip"
                   data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Enviar el link por WhatsApp">
                        <i class="bi bi-whatsapp" style="font-size: 1.4em;"></i>
                </a>
            </div>
        `
        this.btnDelete = this.eGui.querySelector('.delete-row')
        this.btnDelete.onclick = () => params.clickedDelete(params.data)
    }

    getGui() { return this.eGui }
    refresh() { return false }
    destroy() { }
}
