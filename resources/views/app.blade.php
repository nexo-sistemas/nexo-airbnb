<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <link rel="apple-touch-icon" href="{{ asset('logo.PNG') }}">
    <link rel="manifest" href="{{ asset('/manifest.json') }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png">
    <link rel="icon" type="image/png" href="../assets/img/favicon.png">
    <title> @yield('title') </title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- CSS Files -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"
        integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossorigin="anonymous">
    </script>
    <meta name="theme-color" content="#001a57">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="translucent">
    @vite(['resources/scss/app.scss', 'resources/js/app.js'])
    @yield('script-page')
</head> 

<body class="g-sidenav-show  bg-gray-100">

    <div class="opaco" id='loading-_-'>
        <div class="loader loader--style5" title="4">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30"
                style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <rect x="0" y="0" width="4" height="10" fill="#fff">
                    <animateTransform attributeType="xml" attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="10" y="0" width="4" height="10" fill="#fff">
                    <animateTransform attributeType="xml" attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="20" y="0" width="4" height="10" fill="#fff">
                    <animateTransform attributeType="xml" attributeName="transform" type="translate"
                        values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite" />
                </rect>
            </svg>
        </div>
    </div>
    @yield('content')


    <div class="toast-container position-fixed top-50 start-50 translate-middle">
        <div id="toastPlacement" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto" id="toast-title">Bootstrap</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                <span id="toast-mensaje"></span>
                <div class="mt-2 pt-2 border-top" id="toast-button">
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast">Cerrar</button>
                    <button type="button" class="btn btn-primary btn-sm" style="background: #001a57;">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('/sw.js') }}"></script>
    <script>
        if (!navigator.serviceWorker.controller) {
            navigator.serviceWorker.register("/sw.js").then(function(reg) {
                console.log("Service worker has been registered for scope: " + reg.scope);
            });
        }
    </script>
</body>

</html>
