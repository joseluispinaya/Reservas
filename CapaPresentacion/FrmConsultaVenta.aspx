<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="FrmConsultaVenta.aspx.cs" Inherits="CapaPresentacion.FrmConsultaVenta" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="vendor/jquery-ui/jquery-ui.css" >
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">

<div class="card shadow mb-4" id="overlays">
    <div class="card-header py-3 bg-second-primary">
        <h6 class="m-0 font-weight-bold text-white">Detalle de Venta</h6>
    </div>
    <div class="card-body">
        <div class="form-row align-items-end">
            <div class="form-group col-sm-3">
            </div>
            <div class="form-group col-sm-3 busqueda-fecha">
                <label for="txtfeini">Fecha Inicio</label>
                <input type="text" class="form-control form-control-sm" id="txtfeini">
            </div>
            <div class="form-group col-sm-3 busqueda-fecha">
                <label for="txtfechfin">Fecha Fin</label>
                <input type="text" class="form-control form-control-sm" id="txtfechfin">
            </div>
            <div class="form-group col-sm-3">
               <button class="btn btn-success btn-sm" type="button" id="btnBuscara"><i class="fas fa-search"></i> Buscar</button>
            </div>
        </div>

        <hr/>
        <div class="row">
            <div class="col-sm-12">
                <table id="tbVencon" class="table table-sm table-striped" cellspacing="0" style="width:100%">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Documento</th>
                            <th>Cod. Venta</th>
                            <th>Fecha</th>
                            <th>Nro CI Cliente</th>
                            <th>Cliente</th>
                            <th>Total Venta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="vendor/jquery-ui/jquery-ui.js"></script>
    <script src="vendor/jquery-ui/idioma/datepicker-es.js"></script>
    <script src="js/FrmConsultaVenta.js" type="text/javascript"></script>
</asp:Content>
