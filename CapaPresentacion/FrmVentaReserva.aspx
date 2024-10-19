﻿<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="FrmVentaReserva.aspx.cs" Inherits="CapaPresentacion.FrmVentaReserva" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="vendor/select2/select2.min.css" rel="stylesheet">
    <style>
        .select2 {
            width: 100% !important;
        }
        .input-reducido {
            width: 60px; /* Ajusta el valor según tus necesidades */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
<div class="row" id="overlay">
    <div class="col-sm-8">
        <div class="row">
            <div class="col-sm-12">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 bg-second-primary">
                        <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-address-book"></i> DETALLE DE CLIENTE</h6>
                    </div>
                    <div class="card-body">
                        <input id="txtIdReserrv" class="model" name="IdReser" value="0" type="hidden" />
                        <input id="txtIdclienteAte" class="model" name="IdClientev" value="0" type="hidden" />
                        <div class="form-row">
                            <div class="form-group col-sm-5">
                                <label for="txtNombreClienteat">Nombre</label>
                                <input type="text" class="form-control form-control-sm" disabled id="txtNombreClienteat">
                            </div>
                            <div class="form-group col-sm-4">
                                <label for="txtDocumentoClienteat">Nro CI</label>
                                <input type="text" class="form-control form-control-sm" disabled id="txtDocumentoClienteat">
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="txtcelu">Nro Celular</label>
                                <input type="text" class="form-control form-control-sm" disabled id="txtcelu">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 bg-second-primary">
                        <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-tags"></i> Detalle Productos</h6>
                    </div>
                    <div class="card-body">
                        <div class="form-row">
                            <div class="form-group col-sm-12">
                                <select class="form-control form-control-sm" id="cboBuscarProducto" >
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <table id="tbReservasa" class="table table-striped table-sm">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="col-sm-4">

        <div class="row">
            <div class="col-sm-12">
                <div class="card shadow mb-4" id="loaaaV">
                    <div class="card-header py-3 bg-second-primary">
                        <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-money-bill-alt"></i> Detalle Reserva</h6>
                    </div>
                    <div class="card-body">
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="inputGroupSubTotal">Fecha Registro</span>
                            </div>
                            <input type="text" class="form-control text-center" aria-label="Small" aria-describedby="inputGroupSubTotal" id="txtFechaRese" disabled>
                        </div>
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="inputGroupIGV">Reservado en</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupIGV" id="txtSubTotal" disabled>
                        </div>
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="inputGroupTotal">Total Bs.</span>
                            </div>
                            <input type="text" class="form-control text-center" aria-label="Small" aria-describedby="inputGroupTotal" id="txtTotal" disabled>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="row">
            <div class="col-sm-12">
                <div class="card shadow">
                    <div class="card-body">
                        <div class="form-group mb-0">
                            <button type="button" class="btn btn-success btn-sm btn-block" id="btnTerminarvent">Terminar Venta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="vendor/select2/select2.min.js"></script>
    <script src="vendor/select2/es.min.js"></script>
    <script src="js/FrmVentaReserva.js" type="text/javascript"></script>
</asp:Content>
