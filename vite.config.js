import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    server: {
        hmr: {
            host: "localhost",
        },
    },
    plugins: [
        laravel({
            input: [
                "resources/scss/app.scss",
                "resources/js/app.js",
                "resources/js/pages/auth.js",
                "resources/js/pages/entidad.js",
                'resources/js/pages/administrador.js',
                "resources/js/pages/ficha.js",
                "resources/js/pages/conserje.js",
                "resources/js/pages/login-propietario.js"
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            "@pages": "/resources/js/pages",
            //"@libs": "/resources/js/app/libs",
            "@nodeJS": "/node_modules"
        },
    },
});
