export default class RenderGroup {
    init(params) {
      const tempDiv = document.createElement('div');
      const color = params.node.group ? 'coral' : 'lightgreen';
      tempDiv.innerHTML = `<span style="background-color: ${color}; padding: 2px; ">${params.value}</span>`;
      this.eGui = tempDiv.firstChild;
    }

    getGui() {
      return this.eGui;
    }

    refresh(params) {
      return false;
    }
  }
