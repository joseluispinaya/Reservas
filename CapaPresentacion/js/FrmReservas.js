
$(document).ready(function () {
    cargarReser();

})

let DetalleParaReserva = [];
let estadoRese = false;

function cargarReser() {

    $.ajax({
        type: "POST",
        url: "FrmReservas.aspx/Obtener",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                var events = [];

                //console.log(data.d.objeto);
                //start: row.FechaReserva,
                //var fechaHora = row.FechaReserva + 'T' + row.Hora; // Concatenar en formato ISO 8601 (yyyy-MM-ddTHH:mm)
                $.each(data.d.Data, function (i, row) {
                    var fechaHora = row.FechaReserva + 'T' + row.Hora;

                    events.push({
                        id: row.IdReserva,
                        title: 'Cod: ' + row.Codigo + ' - ' + row.Cliente.Nombre,
                        start: fechaHora,
                        descripcion: row.Comentario,
                        activo: row.Activo,
                        color: row.Color
                    });
                });

                $('#calendar').fullCalendar('destroy');
                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month, basicWeek, basicDay'
                    },
                    /*navLinks: true,*/
                    /*selectable: true,*/
                    editable: true,
                    events: events,
                    eventClick: function (calEvent, jsEvent, view) {
                        //$("#txtDocumentoClienteat").val(calEvent.descripcion);
                        //$("#txtcelu").val(calEvent.id);
                        //$("#modalrol").modal("show");

                        $("#txtIdReserrr").val("0");
                        estadoRese = calEvent.activo;
                        detalleReserva(calEvent.id);
                    }
                    //eventRender: function (event, element) {
                    //    element.attr('title', event.descripcion);
                    //}
                });
            }

        }
    });
}


function detalleReserva($idRes) {


    var request = {
        IdReserva: $idRes
    };

    $.ajax({
        type: "POST",
        url: "FrmReservas.aspx/DetalleReservaCale",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {

                $("#txtIdReserrr").val($idRes);

                $("#txtNombreClienteat").val(data.d.Data.Cliente.Nombre);
                $("#txtDocumentoClienteat").val(data.d.Data.Cliente.NumeroDocumento);
                $("#txtcelu").val(data.d.Data.Cliente.Telefono);

                $("#tbReservasaat tbody").html("");

                DetalleParaReserva = data.d.Data.ListaDetalleReserva;
                DetalleParaReserva.forEach((item) => {

                    $("#tbReservasaat tbody").append(
                        $("<tr>").append(
                            $("<td>").text(`${item.NombreProducto} ${item.Cantidad}`),
                            $("<td>").text(item.PrecioUnidad),
                            $("<td>").text(item.ImporteTotal)
                        )
                    );
                });

                $("#txtregistro").val(data.d.Data.FechaRegistro);
                $("#txtFechaReseat").val(data.d.Data.FechaReserva + " " + data.d.Data.Hora);
                //$("#txtFechaReseat").val(data.d.objeto.FechaReserva);
                $("#txtTotalat").val(data.d.Data.TotalCosto);
                $("#txtcomentarioat").val(data.d.Data.Comentario);

                // Validar estadoRese y habilitar o deshabilitar el botón
                if (estadoRese) {
                    $("#btnGuardarCambiosat").show();
                    //$("#btnGuardarCambiosat").removeAttr("disabled");
                } else {
                    $("#btnGuardarCambiosat").hide();
                    //$("#btnGuardarCambiosat").attr("disabled", "disabled");
                }

                $("#modalrol").modal("show");
            } else {
                swal("Mensaje", data.d.Mensaje, "success");
            }
        }
    });
}
$('#btnGuardarCambiosat').on('click', function () {
    //var idresevi = parseInt($("#txtIdReserrr").val());
    var idreser = $("#txtIdReserrr").val();
    //var url = 'frmVentaReserva.aspx?id=' + encodeURIComponent(idreser);
    var url = 'FrmVentaReserva.aspx?id=' + idreser;

    window.location.href = url;
})