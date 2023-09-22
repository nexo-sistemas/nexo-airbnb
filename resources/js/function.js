import { Modal, Toast } from "bootstrap";

const form_data = async (element) => {
    let form_data = new FormData(element);
    return await serialize(form_data);
};


const listarObservaciones = async (fichaId) =>{
    let html = "";
    var { data } = await axios.get(`${apiURL}/ficha/historial/${fichaId}`)
    if ( data.ok ) {

        data.response.map( (resp) => {
            html+=  `<li class="list-group-item">${resp.observacion}</li>`
        });
    }

    document.getElementById('mensajes________').innerHTML = html;

}

const nxtoast = async (option) => {
    const toastLive = document.getElementById("toastPlacement");
    const toastTitle = document.getElementById("toast-title");
    const toastMensaje = document.getElementById("toast-mensaje");
    const toastButton = document.getElementById("toast-button");

    const toast = new Toast(toastLive);
    toast.animation = true;

    if (option.hasOwnProperty("title")) {
        toastTitle.innerHTML = option.title;
    }

    if (option.hasOwnProperty("mensaje")) {
        toastMensaje.innerHTML = option.mensaje;
    }

    if (option.hasOwnProperty("button")) {
        let htmlButtonToast = "";

        option.button.map((item) => {
            htmlButtonToast += `
                <button type="button"
                   style="${item.hasOwnProperty("style")
                   ? item.style
                   : ""
               }"
                   class="${item.hasOwnProperty("class")
                    ? item.class
                    : "btn btn-secondary btn-sm"
                }"
                   ${item.hasOwnProperty("function")
                    ? 'data-bs-dismiss="toast"'
                    : ""
                }
                   id="${item.hasOwnProperty("id") ? item.id : ""}">
                   ${item.title}
                </button>
            `;
        });

        toastButton.innerHTML = htmlButtonToast;

        await option.button.map((itemCallback) => {
            if (itemCallback.callback) {
                document
                    .getElementById(itemCallback.id)
                    .addEventListener("click", () => {
                        itemCallback.callback();
                    });
            }
        });

        //callback
    }

    if (option.hasOwnProperty("show")) {
        toast.show();
    }

    if (option.hasOwnProperty("hide")) {
        toast.hide();
    }
};


const serialize = async (data) => {
    let obj = {};
    for (let [key, value] of data) {
        if (obj[key] !== undefined) {
            if (!Array.isArray(obj[key])) {
                obj[key] = [obj[key]];
            }
            obj[key].push(value);
        } else {
            obj[key] = value;
        }
    }
    return obj;
};

const nxmodal = (element) => {
    return new Modal(element);
};

const alertMessage = async (i, msg) => {
    let element = document.createElement("div"),
        mainBody = document.querySelector("body");
    element.innerHTML = msg;
    element.classList = `alert-message ${i}`;
    mainBody.appendChild(element);
    setTimeout(() => {
        element.style.transition =
            "all .95s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        element.style.marginBottom = "-20rem";
    }, 5000);
    setTimeout(() => {
        element.remove();
    }, 7000);
};

export {
    form_data,
    alertMessage,
    nxmodal,
    nxtoast,
    serialize,
    listarObservaciones
};
