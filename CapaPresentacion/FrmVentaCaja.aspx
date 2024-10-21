<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="FrmVentaCaja.aspx.cs" Inherits="CapaPresentacion.FrmVentaCaja" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="vendor/select2/select2.min.css" rel="stylesheet">
    <style>
        .select2 {
            width: 100% !important;
        }

        select:disabled {
            background-color: #e9ecef;
            cursor: not-allowed;
        }

        .input-reducido {
            width: 60px;
            /* Ajusta el valor según tus necesidades */
        }

        .switchz {
            position: relative;
            display: inline-block;
            width: 200px;
            height: 42px;
        }

            .switchz input {
                /*opacity: 0;*/
                width: 0;
                height: 0;
            }

            .switchz label {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #3292e0;
                /* NEGRO 1E1E1E */
                transition: .4s;
                border-radius: 25px;
            }

                .switchz label::before {
                    position: absolute;
                    content: "";
                    height: 20px;
                    width: 60px;
                    left: 5px;
                    bottom: 4px;
                    background-color: #ff9800;
                    /* AMARILLO */
                    transition: .4s;
                    border-radius: 20px;
                }

            .switchz input:checked + label {
                background-color: #ff9800;
                /* AMARILLO */
            }

                .switchz input:checked + label::before {
                    transform: translateX(130px);
                    background-color: #3292e0;
                    /* negro */
                }

            .switchz input:checked::before,
            .switchz input:checked::after {
                color: #fff;
            }

            .switchz input::before,
            .switchz input::after {
                position: absolute;
                top: 50%;
                transform: translateY(-55%);
                font-weight: bolder;
                z-index: 2;
            }

            .switchz input::before {
                content: "NO";
                left: 20px;
                color: #fff;
            }

            .switchz input::after {
                content: "SI";
                right: 20px;
                color: #3292e0;
                /* negro */
            }

            .switchz input:checked::before {
                color: #1E1E1E;
            }

            .switchz input:checked::after {
                color: #fff;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
<div class="row" id="overlayc">
    <div class="col-sm-8">
        <div class="row">
            <div class="col-sm-12">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 bg-second-primary">
                        <h6 class="m-0 font-weight-bold text-white">Detalle Cliente</h6>
                    </div>
                    <div class="card-body">
                        <input id="txtIdclienteAtec" class="model" name="IdClientev" value="0" type="hidden" />
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <label for="cboBuscarCliente">Buscar Clente C.I</label>
                                <select class="form-control form-control-sm" id="cboBuscarCliente">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="form-group col-sm-6 text-center">
                                <label for="cboBusciente">Nuevo Clente</label><br />
                                <span class="switchz">
                                    <input type="checkbox" id="switcher">
                                    <label for="switcher"></label>
                                </span>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-3">
                                <label for="txtDocumentoClienteat">Nro CI</label>
                                <input type="text" class="form-control form-control-sm" id="txtDocumentoClienteat">
                            </div>
                            <div class="form-group col-sm-4">
                                <label for="txtNombreClienteat">Nombre</label>
                                <input type="text" class="form-control form-control-sm" id="txtNombreClienteat">
                            </div>
                            
                            <div class="form-group col-sm-2">
                                <label for="txtcelu">Nro Celular</label>
                                <input type="text" class="form-control form-control-sm" id="txtcelu">
                            </div>
                            <div class="form-group col-sm-3">
                                <label for="txtdirecc">Direccion</label>
                                <input type="text" class="form-control form-control-sm" id="txtdirecc">
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
                        <h6 class="m-0 font-weight-bold text-white">Detalle Productos</h6>
                    </div>
                    <div class="card-body">
                        <div class="form-row">
                            <div class="form-group col-sm-12">
                                <select class="form-control form-control-sm" id="cboBuscarProductov" >
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <table class="table table-striped table-sm" id="tbVentaca">
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
                <div class="card shadow mb-4">
                    <div class="card-header py-3 bg-second-primary">
                        <h6 class="m-0 font-weight-bold text-white">Detalle Venta</h6>
                    </div>
                    <div class="card-body">
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="inputGroupSubTotal">Fecha</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupSubTotal" id="txtFechaRese" disabled>
                        </div>
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="inputGroupIGV">Cantidad Total</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupIGV" id="txtSubTotal" disabled>
                        </div>
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                              <span class="input-group-text" id="inputGroupTotal">Total Bs</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupTotal" id="txtTotal" disabled>
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
                            <button type="button" class="btn btn-success btn-sm btn-block" id="btnTermiCaja">Terminar Venta</button>
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
    <script src="js/FrmVentaCaja.js" type="text/javascript"></script>
</asp:Content>
