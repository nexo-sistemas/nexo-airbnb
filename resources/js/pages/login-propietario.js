import { alertMessage, form_data } from "../function";

export default (async () => {

    const loginPropietario = async (formLoginPropietario) => {
        axios.get(`/sanctum/csrf-cookie`).then((result) => {
            axios.post(`${apiURL}/login/propietario`, formLoginPropietario).then(async (resp) => {
                if (!resp?.data.ok) {
                    alertMessage('danger', resp.data.message);
                    return true;
                }
                localStorage.setItem('_user', JSON.stringify(resp.data.user))
                window.location.href = `/frm?u=${resp.data.user.uuid}`
            })
        })
    }

    if (localStorage.getItem('_user')) {
        const _user = JSON.parse(localStorage.getItem('_user'))
        await loginPropietario({
            usuario : _user.uuid,
            password: _user._usuario,
            passPropietario: 1
        });
    }

    document.getElementById('btn-form-login-propietario').addEventListener('click', async () => {
        const passPropietario = document.getElementById('passPropietario');

        let formsPropietario = document.getElementById('login-form-propietario')
        let formLoginPropietario = await form_data(document.querySelector('#login-form-propietario'))

        if (!formsPropietario.checkValidity()) {
            alertMessage('danger', 'Llenar todos los campos para iniciar session');
            return;
        }

        if (passPropietario.value == 0) {
            const password = document.getElementById('password');
            const repleyPassword = document.getElementById('repleyPassword');
            if (password.value !== repleyPassword.value) {
                alertMessage('danger', 'Las contraseñas deben ser iguales');
                return;
            }
        }

        loginPropietario(formLoginPropietario);
    })
})();
