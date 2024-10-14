<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="FrmProductos.aspx.cs" Inherits="CapaPresentacion.FrmProductos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/productes.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header py-3 bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white">Lista de Productos</h6>
        </div>
        <div class="card-body">
            <div class="row justify-content-center align-items-center">
                <button type="button" id="btnNuevoProd" class="btn btn-success"><i class="fas fa-plus-circle"></i> Nuevo Producto</button>
            </div>
            <hr />
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-bordered" id="tbProduct" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Foto</th>
                                <th>Categoria</th>
                                <th>Nombres</th>
                                <th>Precio</th>
                                <th>Estado</th>
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

<div class="modal fade" id="modalrolp" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 id="myTitulop">Detalle Producto</h6>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <input id="txtIdProducto" class="model" name="IdProducto" value="0" type="hidden" />
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <label for="txtNombrePr">Nombre</label>
                                <input type="text" class="form-control form-control-sm model" id="txtNombrePr" name="Nombres">
                            </div>
                            <div class="form-group col-sm-6">
                                <label for="txtDescripcionPr">Descripcion</label>
                                <input type="text" class="form-control form-control-sm model" id="txtDescripcionPr" name="Descripcion">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <label for="txtPrecioPr">Precio</label>
                                <input type="text" class="form-control form-control-sm model" id="txtPrecioPr" name="Precio">
                            </div>
                            <div class="form-group col-sm-6">
                                <label for="cboCatego">Categoria</label>
                                <select class="form-control form-control-sm" id="cboCatego">
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <label for="cboEstadoPr">Estado</label>
                                <select class="form-control form-control-sm" id="cboEstadoPr">
                                    <option value="1">Activo</option>
                                    <option value="0">No Activo</option>
                                </select>
                            </div>
                            <div class="form-group col-sm-6">
                                <label for="txtOcupacion">Fecha Actual</label>
                                <input type="text" class="form-control form-control-sm" id="txtFechaa" readonly name="ocupacion" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <p>Seleccione Imagen</p>
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="txtFotoP" accept="image/*">
                                <label class="custom-file-label" for="txtFotoP">Ningún archivo seleccionado</label>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-12 text-center">
                                <img id="imgUsuarioP" src="Imagenes/Sinfotop.png" alt="Foto usuario" style="height: 120px; max-width: 120px; border-radius: 50%;">
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="modal-footer">
                <button id="btnGuardarCambiosP" class="btn btn-primary btn-sm" type="button">Guardar Cambios</button>
                <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancel</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/FrmProductos.js" type="text/javascript"></script>
</asp:Content>
