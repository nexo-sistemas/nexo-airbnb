export default async () => {
    document.getElementById('salir-session-login').addEventListener('click', function () {
        axios.post(`${apiURL}/auth/logout`).then((result) => {
            if (result.data.ok) {
                localStorage.removeItem('_user')
                window.location.href = '/'
            }
        }).catch((err) => {
            console.log(err)
        })
    });
}
