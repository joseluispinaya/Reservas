<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMas.Master" AutoEventWireup="true" CodeBehind="FrmUsuarios.aspx.cs" Inherits="CapaPresentacion.FrmUsuarios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="css/inpfile.css" rel="stylesheet"/>
    <style>
        .buttons-excel{
            color: #fff !important;
            background-color: #28a745 !important;
            border-color: #28a745 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
<div class="card shadow mb-4">
    <div class="card-header py-3 bg-second-primary">
        <h6 class="m-0 font-weight-bold text-white">Lista de Usuarios</h6>
    </div>
    <div class="card-body">
        <div class="row justify-content-center align-items-center">
            <button type="button" id="btnNuevoRol" class="btn btn-success"><i class="fas fa-user-plus"></i> Nuevo Registro</button>
        </div>
        <hr />
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-sm table-bordered" id="tbUsuario" cellspacing="0" style="width:100%">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Foto</th>
                            <th>Rol</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
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

<!--  Modal-->
<div class="modal fade" id="modalrol" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 id="myLarlLabel">Detalle Usuario</h6>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                
                <input type="hidden" value="0" id="txtIdUsuario">
                <div class="row">
                    <div class="col-sm-8">
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <label for="txtNombres">Nombre</label>
                                <input type="text" class="form-control form-control-sm input-validar" id="txtNombres"
                                    name="Nombre">
                            </div>
                            <div class="form-group col-sm-6">
                                <label for="txtApellidos">Apellidos</label>
                                <input type="text" class="form-control form-control-sm input-validar"
                                    id="txtApellidos" name="Apellidos">
                            </div>
                            
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <label for="txtCorreo">Correo</label>
                                <input type="email" class="form-control form-control-sm input-validar"
                                    id="txtCorreo" name="Correo">
                            </div>
                            <div class="form-group col-sm-6">
                                <label for="cboRol">Rol</label>
                                <select class="form-control form-control-sm" id="cboRol">
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-4">
                                <label for="cboEstado">Estado</label>
                                <select class="form-control" id="cboEstado">
                                    <option value="1">Activo</option>
                                    <option value="0">No Activo</option>
                                </select>
                            </div>
                            <div class="form-group col-sm-8">
                                <label for="txtFddoto">Seleccione Foto</label>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="txtFotoS" accept="image/*">
                                    <label class="custom-file-label" for="txtFotoS">Ningún archivo seleccionado</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-row h-100 d-flex align-items-center justify-content-center">
                            <div class="form-group col-sm-12 text-center">
                                <img id="imgUsuarioM" src="Imagenes/Sinfotop.png" alt="Foto usuario" style="height: 120px; max-width: 120px; border-radius: 50%;">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary btn-sm" type="button" id="btnGuardarCambios">Guardar</button>
                <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/FrmUsuarios.js" type="text/javascript"></script>
</asp:Content>
