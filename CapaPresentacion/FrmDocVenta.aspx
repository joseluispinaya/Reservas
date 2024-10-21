<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FrmDocVenta.aspx.cs" Inherits="CapaPresentacion.FrmDocVenta" %>

<!DOCTYPE html>

<html>
<head>
<meta name="viewport" content="width=device-width" />
    <title>Boleta de Venta</title>
    <style>
        .contenedor {
           /*width: 900px !important;
           height:842px !important;*/
           width: 100%;
           max-width: 900px;
           margin:auto;
           margin-bottom: 20px;
        }
        body{
           font-family:Arial, Helvetica, sans-serif
        }
        p.title{
           font-weight:bold;
        }
         p.title2{
           font-weight:bold;
           color: #03A99F;
           font-size:20px;
        }
        p.text{
           font-size:15px;
           font-weight:100;
           color:#858585;
        }
        p{
           margin:0px
        }
        .tbth{
           text-align:left;
        }

        table.tbproductos{
            border-collapse: separate;
            border-spacing: 4px;
        }

        table.tbproductos thead tr th {
           background-color: #03A99F;
           padding:10px;
           font-size:15px;
           color:white;
        }
        table.tbproductos tbody tr td{
           padding:10px;
        }
        .item{
           font-size:15px;
           font-weight:100;
           color:#757575;
        }
        .item-2{
        font-size:15px;
           font-weight:bold;
           color:#757575;
        }

        .item-3{
           font-size:15px;
           font-weight:bold;
           background-color:#03A99F;
           color:white;
        }

         .td-item {
           border-bottom:2px solid #E8E8E8 !important;
         }
        .td-itemz {
            padding:10px;
            border-bottom: 2px solid #E8E8E8 !important;
        }
        .item-z {
            padding:10px;
            font-size: 15px;
            font-weight: bold;
            background-color: #03A99F;
            color: white;
        }
    </style>
</head>
<body>
    <div style="font-size: 11px; text-align: right;">
        <div style="text-align: center;">
            <button type="button" id="Imprimir" onclick="javascript:imprSelec('seleccionContainer')" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                IMPRIMIR
            </button>
        </div>
        <br />
    </div>
    <div id="seleccionContainer">
        <div class="contenedor" id="seleccion">

            <table style="width: 100%">
                <tr>
                    <td>
                        <img src="Imagenes/logo1d.png" style="width: 100%;" />
                    </td>
                    <td style="text-align: right; width: 190px">
                        <table style="margin-right: 0; margin-left: auto">
                            <tr>
                                <td>
                                    <p class="title2">NOTA DE VENTA</p>
                                </td>
                            </tr>
                            <tr>
                                <td><span id="tipodoc">001232</span></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <br />
            <table style="width: 100%">
                <tr>
                    <td style="width: 100px">
                        <table>
                            <tr>
                                <td>
                                    <p class="title">Cliente:</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="title">NRO CI:</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="title">Direccion:</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <p id="lblnombre" class="text"></p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p id="lblnroci" class="text"></p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p id="lbldire" class="text"></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="width: 100px">
                        <table>
                            <tr>
                                <td>
                                    <p class="title">Celular:</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="title">Cantidad:</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="title">Total:</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <p id="lblcelu" class="text"></p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p id="lblcanti" class="text"></p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p id="lbltotall" class="text"></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <br />
            <%--<br />--%>

            <table class="tbproductos" id="tbDetalles" style="width: 100%">
                <thead>
                    <tr>
                        <th class="tbth">Producto</th>
                        <th class="tbth" style="width: 130px">Cantidad</th>
                        <th class="tbth" style="width: 130px">Precio</th>
                        <th class="tbth" style="width: 130px">Total</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" rowspan="2"></td>
                        <td class="td-itemz">
                            <p class="item-2">Cantidad Total</p>
                        </td>
                        <td class="item-z">
                            <p id="cantTotal">0</p>
                        </td>
                    </tr>
                    <%--<tr>
            <td class="td-itemz">
                <p class="item-2" >VER</p>
            </td>
             <td class="item-z">
                 <p>dato a</p>
            </td>
        </tr>--%>
                    <tr>
                        <td class="item-z">
                            <p>Total</p>
                        </td>
                        <td class="item-z">
                            <p id="fpagado">0.00 /Bs.</p>
                        </td>
                    </tr>
                </tfoot>
            </table>

        </div>

        <div class="contenedor" id="seleccion2">
        </div>
    </div>
    

    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="js/FrmDocVenta.js" type="text/javascript"></script>
</body>
</html>
