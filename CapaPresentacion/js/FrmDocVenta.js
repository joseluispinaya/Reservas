

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const IdVenta = urlParams.get('id')

    if (IdVenta !== null) {
        CargarDatos(IdVenta);
    } else {
        alert("No hay parámetro recibido. El formulario se cerrará.");
        window.close();
    }

    //const IdVenta = 1003;
    //CargarDatos(IdVenta);
});


function CargarDatos($IdVenta) {

    $('#tbDetalles tbody').html('');

    var request = {
        IdVenta: $IdVenta
    };

    $.ajax({
        type: "POST",
        url: "FrmVentaReserva.aspx/DetalleVenta",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                var activo = response.d.Data;
                //$("#cantTotal").text("Nro: " + activo.Codigo);
                $("#tipodoc").text("Nro: " + activo.Codigo);
                $("#lblnombre").text(activo.Cliente.Nombre);


                $("#lblnroci").text(activo.Cliente.NumeroDocumento);
                $("#lblcelu").text(activo.Cliente.Telefono);
                $("#lbldire").text(activo.Cliente.Direccion);

                $("#tbDetalles tbody").html("");
                var totalCosto = activo.TotalCosto;
                var canti = activo.CantidadTotal;
                var unidad = canti > 1 ? "Uds" : "Ud";

                $.each(activo.ListaDetalleVenta, function (i, row) {
                    $("<tr>").append(
                        $("<td>").addClass("td-item").append($("<p>").addClass("item").text(row.NombreProducto)),
                        $("<td>").addClass("td-item").append($("<p>").addClass("item").text(row.Cantidad)),
                        $("<td>").addClass("td-item").append($("<p>").addClass("item").text(row.PrecioUnidad.toFixed(2))), // Mostrar con 2 decimales
                        $("<td>").css("background-color", "#EDF6F9").append($("<p>").addClass("item").text(row.ImporteTotal.toFixed(2))) // Mostrar con 2 decimales y color de fondo
                    ).appendTo("#tbDetalles tbody");

                })
                $("#lblcanti").text(canti + " " + unidad);
                $("#lbltotall").text(totalCosto.toFixed(2) + " /Bs.");

                $("#cantTotal").text(canti + " " + unidad);

                if (!isNaN(totalCosto)) {
                    $("#fpagado").text(totalCosto.toFixed(2) + " /Bs.");
                } else {
                    $("#fpagado").text("0.00 /Bs."); // Manejo de errores en caso de NaN
                }

                $("#seleccion2").html($("#seleccion").html());
            } else {
                alert("Ocurrió un error. El formulario se cerrará.");
                window.close();
            }
        }
    });

}

function imprSelec(nombre) {
    var printContents = document.getElementById(nombre).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
function hide() {
    document.getElementById('Imprimir').style.visibility = "hidden";
}

window.addEventListener('beforeunload', function (e) {
    var confirmationMessage = '¿Seguro que quieres salir?';

    e.preventDefault();
    e.returnValue = confirmationMessage;
    return confirmationMessage;
});

window.addEventListener('unload', function (e) {
    setTimeout(function () {
        window.close();
    }, 3000);
});