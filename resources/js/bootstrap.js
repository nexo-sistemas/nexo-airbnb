/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
import { alertMessage } from './function';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true

window.axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    console.log()
    if (401 === error.response.status) {
        if ( document.location.pathname === '/') {
            alertMessage('danger', error.response.data.message);
            return;
        }

        window.location.href = '/'
    }

    if (422 === error.response.status) {
        if ( error.response.data.validateExistingUser) {
            document.querySelector('.usuario-validate-existing').innerHTML = error.response.data.errors.toString();
            document.querySelector('.usuario-validate-existing').classList.add('show--')
        }
        alertMessage('danger',error.response.data.errors.toString())
        return;
    }

    if (400 === error.response.status) {
        alertMessage('danger',error.response.data.errors.toString())
        return;
    }

    if (500 ===  error.response.status) {
        alertMessage('danger',error.response.data.errors.toString())
        return;
    }
});

window.apiURL = import.meta.env.VITE_APIURL
window.apiURLWHATSAPP = import.meta.env.VITE_APIWHATSAPP
window.apiKey__ = import.meta.env.VITE_APIKEY
window.URLAPP = import.meta.env.VITE_URL

const forms = document.querySelectorAll('.needs-validation')

// Loop over them and prevent submission
Array.from(forms).forEach(form => {
    form.addEventListener('click', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
    }, false)
})

document.querySelector('.usuario-validate-existing-input')?.addEventListener('input', (e) => {
    document.querySelector('.usuario-validate-existing').classList.remove('show--')
    document.querySelector('.usuario-validate-existing').innerHTML = '';
})
