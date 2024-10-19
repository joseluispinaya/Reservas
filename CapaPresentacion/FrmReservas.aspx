<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="FrmReservas.aspx.cs" Inherits="CapaPresentacion.FrmReservas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="vendor/calen/fullcalendar.min.css" rel="stylesheet"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4" id="mostrarproductoss">
        <div class="card-header py-3 bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white">Bandeja de Tareas</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-lg-2">
                    <h6 class="m-0 font-weight-bold">Eventos</h6>
                </div>
                <div id="calendar" class="col-lg-10"></div>
            </div>
        </div>
    </div>

    
<div class="modal fade" id="modalrol" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 id="myLargeModalLabel">Informacion de Reserva</h6>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <input id="txtIdclienteAte" class="model" name="IdClientev" value="0" type="hidden" />
                <input id="txtIdReserrr" class="model" name="IdRserv" value="0" type="hidden" />
                <div class="row">
                    <div class="col-sm-8">
                        <div class="form-row">
                            <div class="form-group col-sm-5">
                                <input type="text" class="form-control form-control-sm" disabled id="txtNombreClienteat">
                            </div>
                            <div class="form-group col-sm-4">
                                <input type="text" class="form-control form-control-sm" disabled
                                    id="txtDocumentoClienteat">
                            </div>
                            <div class="form-group col-sm-3">
                                <input type="text" class="form-control form-control-sm" disabled id="txtcelu">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <div class="card shadow mb-4">
                                    <div class="card-header py-3 bg-second-primary">
                                        <h6 class="m-0 font-weight-bold text-white">Detalle Productos</h6>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <table class="table table-bordered table-sm" id="tbReservasaat" cellspacing="0" style="width: 100%">
                                                    <thead>
                                                        <tr>
                                                            <th>Producto Cantidad</th>
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
                                        <h6 class="m-0 font-weight-bold text-white">Detalle Total</h6>
                                    </div>
                                    <div class="card-body">
                                        
                                        <div class="input-group input-group-sm mb-3">
                                            <div class="input-group-prepend">
                                              <span class="input-group-text" id="inputGroupSubTotal">Registro</span>
                                            </div>
                                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupSubTotal" id="txtregistro" disabled>
                                        </div>
                                        <div class="input-group input-group-sm mb-3">
                                            <div class="input-group-prepend">
                                              <span class="input-group-text" id="inputGroupIGV">Para</span>
                                            </div>
                                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupIGV" id="txtFechaReseat" disabled>
                                        </div>
                                        <div class="input-group input-group-sm mb-3">
                                            <div class="input-group-prepend">
                                              <span class="input-group-text" id="inputGroupTotal">Total Bs</span>
                                            </div>
                                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupTotal" id="txtTotalat" disabled>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-sm-12">
                                                <textarea class="form-control" rows="2" disabled id="txtcomentarioat"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="modal-footer">
                <button id="btnGuardarCambiosat" class="btn btn-primary btn-sm" type="button">Generar atencion</button>
                <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancel</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="vendor/calen/moment.min.js"></script>
    <script src="vendor/calen/fullcalendar.min.js"></script>
    <script src="vendor/calen/es.js"></script>
    <script src="js/FrmReservas.js" type="text/javascript"></script>
</asp:Content>
