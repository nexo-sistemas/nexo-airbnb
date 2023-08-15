export default class NoResult {

    init(params) {
        this.eGui = document.createElement('div');
        this.eGui.innerHTML = 'No se encontro Resultado'
    }

    getGui() {
        return this.eGui;
    }

    refresh(params) {
        return false;
    }

}
