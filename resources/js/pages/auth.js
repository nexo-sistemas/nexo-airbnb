import { alertMessage, form_data } from "../function";

export default ( async() => {
    let button = document.getElementById('btn-form-login');

    button.addEventListener('click', async(e) => {
        e.preventDefault;

        let forms = document.getElementById('login-form')
        let form_login = await form_data(document.querySelector('#login-form'))

        if(!forms.checkValidity()) {
            alertMessage('danger', 'Llenar todos los campos para iniciar session');
            return true
        }

        axios.get(`/sanctum/csrf-cookie`).then((result) => {
            axios.post(`${apiURL}/login`, form_login).then(async(resp) => {
                if(!resp?.data.ok) {
                    alertMessage('danger', resp.data.message);
                    return true;
                }

                localStorage.setItem('_user', JSON.stringify(resp.data.user))
                if (resp.data.user.user_type === '1') {
                    window.location.href = '/entidades'
                } else if (resp.data.user.user_type === '2') {
                    window.location.href = '/administrador'
                } else if (resp.data.user.user_type === '3') {
                    window.location.href = '/portero'
                }
            })
        })
    });
})();
