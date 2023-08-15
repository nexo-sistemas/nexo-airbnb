@extends('layout.dashboard')
@section('script-page')
    @vite(['resources/js/pages/conserje.js'])
@endsection
@section('content-child')

    <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-lg-6 col-7">
                    <h6>Fichas</h6>
                </div>
            </div>
        </div>
        <div class="card-body ag-theme-material height-grid-dashboard-portero" id="grid-fichas" style="padding:0">
        </div>
    </div>

    <x-modal-ficha-detalle></x-modal-ficha-detalle>
    <x-modal-qr-whatsapp></x-modal-qr-whatsapp>

@endsection
