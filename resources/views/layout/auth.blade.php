@extends('app')
@section('title', 'Login')
@section('script-page')
    @vite(['resources/js/pages/auth.js'])
@endsection
@section('content')
    <main class="main-content">

        <nav class="navbar navbar-main navbar-expand-lg px-0" id="navbarBlur" navbar-scroll="true" style="background: #001a57">
            <div class="container-fluid">
                <nav aria-label="breadcrumb">
                    <img src="{{ Vite::asset('resources/images/logoNexo.png') }}" class="navbar-brand-img h-100"
                        style="width: 130px;" alt="main_logo">
                </nav>
            </div>
        </nav>

        <section>
            <div class="page-header align-items-start pt-5 pb-11 m-3 border-radius-lg"></div>
            <div class="container">
                <div class="row mt-lg-n10 mt-md-n11 mt-n10">
                    <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
                        <div class="card z-index-0">
                            <div class="card-header text-center pt-4">
                                <h5>Iniciar Session</h5>
                            </div>
                            <div class="card-body">
                                <form role="form text-left" class="needs-validation" id="login-form" novalidate>
                                    <div class="mb-3">
                                        <input type="text" class="form-control" name="usuario" placeholder="Usuario" aria-label="Name"
                                            aria-describedby="email-addon" required>
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" class="form-control" name="password" placeholder="Password"
                                            aria-label="Contraseña" aria-describedby="password-addon" required>
                                    </div>

                                    <div class="text-center">
                                        <button type="button" class="btn bg-gradient-dark w-100 my-4 mb-2" id="btn-form-login">Ingresar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

@endsection
