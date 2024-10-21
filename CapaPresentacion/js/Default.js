

$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$.datepicker.setDefaults($.datepicker.regional['es']);

function ObtenerFechaa() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

$(document).ready(function () {
    var usuario = sessionStorage.getItem('usuario');
    if (usuario) {
        var usuarioObj = JSON.parse(usuario);
        var idcliente = usuarioObj.IdCliente;
        CargarDatos(idcliente);
        $("#sesioTaba").text('Salir');
    }

    $("#txtFechaRese").datepicker({ autoclose: true });
    $("#txtFechaRese").val(ObtenerFechaa());

    //$('#timepicker2').timepicker();

    $('#timepicker2').timepicker({
        showMeridian: false,
        defaultTime: 'current',
    });

    cargarProductosPorCatego();
    cargarCategoD();
});

let ProductosParaReserva = [];

function actualizarCantidadHistoria(parametroArreglo) {
    const cantidad = parametroArreglo.length;
    // Actualiza el HTML para mostrar la cantidad de ítems en el historial
    $('#totHis').html(`${cantidad} Orden${cantidad !== 1 ? 'es' : ''}`);
}

function CargarDatos($idClie) {

    var request = {
        IdCliente: $idClie
    };

    $.ajax({
        type: "POST",
        url: "Default.aspx/Obtener",
        data: JSON.stringify(request),
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            const posTablehisto = document.querySelector('#orderHistoryTab .pos-table');

            if (response.d.Estado) {
                $('#regCli').hide();
                // Limpiar el contenido previo en el historial
                posTablehisto.innerHTML = '';

                // Obtener la lista de datos desde la respuesta
                var listaa = response.d.Data;

                // Pasar la lista a la función para actualizar la cantidad en el historial
                actualizarCantidadHistoria(listaa);

                var image = "Imagenes/Sinfotop.png";

                response.d.Data.forEach((item, index) => {
                    // Crear el div para cada producto
                    const historiaRow = `
                        <div class="row pos-table-row">
                            <div class="col-9">
                                <div class="pos-product-thumb">
                                    <div class="img" style="background-image: url(${image})"></div>
                                    <div class="info">
                                        <div class="title">${item.Codigo}</div>
                                        <div class="single-price">Cantidad: ${item.CantidadTotal}</div>
                                        <div class="desc">Estado: ${item.Estado}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3" style="text-align: right">
                                <div class="total-price" style="margin-bottom: 4px">Bs ${item.TotalCosto}</div>
                                <a href="#" class="btn btn-warning btn-icon btn-circle btn-lg" onclick="verDetalle(${item.IdReserva})"><i class="fas fa-eye"></i></a>
                            </div>
                        </div>
                    `;

                    // Insertar el producto en el contenedor
                    posTablehisto.insertAdjacentHTML('beforeend', historiaRow);
                });

            } else {
                // Limpiar el contenido de la tabla
                posTablehisto.innerHTML = '';

                // Aquí podrías también actualizar la cantidad a 0 ítems
                actualizarCantidadHistoria([]);

                // Insertar el nuevo contenido "No hay historial"
                const noHistorialContent = `
                    <div class="h-100 d-flex align-items-center justify-content-center text-center p-20">
                        <div>
                            <div class="mb-3 mt-n5">
                                <svg width="6em" height="6em" viewBox="0 0 16 16" class="text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M14 5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5zM1 4v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4H1z"/>
                                    <path d="M8 1.5A2.5 2.5 0 0 0 5.5 4h-1a3.5 3.5 0 1 1 7 0h-1A2.5 2.5 0 0 0 8 1.5z"/>
                                </svg>
                            </div>
                            <h4>No hay historial</h4>
                        </div>
                    </div>
                `;

                // Insertar el contenido en el padre directo de 'posTablehisto'
                const orderHistoryTab = document.querySelector('#orderHistoryTab');
                orderHistoryTab.innerHTML = noHistorialContent;
            }
        }
    });
}

// Función para manejar el evento de "Ver Detalle"
function verDetalle(IdReserva) {
    console.log("Ver detalle de la reserva con ID: " + IdReserva);
    var idRess = IdReserva;
    detalleReservaIa(idRess);
    //$('#modalDetalleRe').modal('show');
}

function detalleReservaIa($idRes) {


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

                $("#txtIdReserrvd").val($idRes);

                $("#lblnamecli").val(data.d.Data.Cliente.Nombre);
                $("#lblnroci").val(data.d.Data.Cliente.NumeroDocumento);
                $("#lblcelua").val(data.d.Data.Cliente.Telefono);
                $("#lblestados").val(data.d.Data.Estado);
                $("#lblcodre").val(data.d.Data.Codigo);
                $("#lblfechres").val(data.d.Data.FechaReserva + " " + data.d.Data.Hora);
                $("#lblcoment").val(data.d.Data.Comentario);

                $("#lblcanti").val(data.d.Data.CantidadTotal);

                var totalCosto = data.d.Data.TotalCosto;
                if (!isNaN(totalCosto)) {
                    $("#lbltot").val(totalCosto.toFixed(2) + " /Bs.");
                } else {
                    $("#lbltot").val("0.00 /Bs."); // Manejo de errores en caso de NaN
                }

                // Validar estadoRese y habilitar o deshabilitar el botón
                var estadoRese = data.d.Data.Estado;
                if (estadoRese != "Confirmado") {
                    $("#btnCancelar").hide();
                    //$("#btnGuardarCambiosat").removeAttr("disabled");
                } else {
                    $("#btnCancelar").show();
                    //$("#btnGuardarCambiosat").attr("disabled", "disabled");
                }

                $("#tbmispedid tbody").html("");

                DetalleParaReserva = data.d.Data.ListaDetalleReserva;
                DetalleParaReserva.forEach((item) => {

                    $("#tbmispedid tbody").append(
                        $("<tr>").append(
                            $("<td>").text(`${item.NombreProducto} ${item.Cantidad}`),
                            $("<td>").text(item.PrecioUnidad),
                            $("<td>").text(item.ImporteTotal)
                        )
                    );
                });
                $("#modalDetalleRe").modal("show");
            } else {
                swal("Mensaje", data.d.Mensaje, "success");
            }
        }
    });
}

function cargarProductosPorCatego() {
    $.ajax({
        type: "POST",
        url: "FrmProductos.aspx/ObtenerProd", // Actualizado con el nuevo método WebMethod
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                const productos = data.d.Data;  // Obtener directamente la lista de productos
                const container = document.querySelector('.pos-content-container');

                // Limpiar el contenedor antes de llenarlo
                container.innerHTML = '';

                // Crear un único contenedor para la fila de productos
                const productRow = document.createElement('div');
                productRow.className = 'product-row';

                // Iterar sobre los productos
                productos.forEach(producto => {
                    // Crear el contenedor del producto
                    const productContainer = document.createElement('div');
                    productContainer.className = 'product-container';
                    productContainer.setAttribute('data-type', producto.Categoria.Descripcion); // Usa la categoría del producto

                    if (producto.Activo) {
                        // Producto disponible: crear enlace
                        const productLink = document.createElement('a');
                        productLink.href = '#';
                        productLink.className = 'product';
                        //productLink.setAttribute('data-bs-toggle', 'modal');
                        //productLink.setAttribute('data-bs-target', '#modalPos');

                        // Agregar los atributos data-* con la información del producto
                        productLink.setAttribute('data-id', producto.IdProducto);
                        productLink.setAttribute('data-nombre', producto.Nombre);
                        productLink.setAttribute('data-descripcion', producto.Descripcion);
                        productLink.setAttribute('data-precio', producto.PrecioUnidadVenta);
                        productLink.setAttribute('data-imagen', producto.Imagen);

                        // Crear la imagen de fondo del producto
                        const imgDiv = document.createElement('div');
                        imgDiv.className = 'img';
                        imgDiv.style.backgroundImage = `url(${producto.Imagen})`;

                        // Crear el contenedor de texto del producto
                        const textDiv = document.createElement('div');
                        textDiv.className = 'text';

                        // Crear el título del producto
                        const titleDiv = document.createElement('div');
                        titleDiv.className = 'title';
                        titleDiv.innerHTML = `${producto.Nombre}&reg;`;

                        // Crear la descripción del producto
                        const descDiv = document.createElement('div');
                        descDiv.className = 'desc';
                        descDiv.textContent = producto.Descripcion;

                        // Crear el precio del producto
                        const priceDiv = document.createElement('div');
                        priceDiv.className = 'price';
                        priceDiv.textContent = `Bs ${producto.PrecioUnidadVenta}`;

                        // Añadir todos los elementos a su respectivo contenedor
                        textDiv.appendChild(titleDiv);
                        textDiv.appendChild(descDiv);
                        textDiv.appendChild(priceDiv);

                        productLink.appendChild(imgDiv);
                        productLink.appendChild(textDiv);

                        productContainer.appendChild(productLink);
                    } else {
                        // Producto no disponible: crear contenedor con mensaje "No Disponible"
                        const productNotAvailable = document.createElement('div');
                        productNotAvailable.className = 'product not-available';

                        // Crear la imagen de fondo del producto
                        const imgDiv = document.createElement('div');
                        imgDiv.className = 'img';
                        imgDiv.style.backgroundImage = `url(${producto.Imagen})`;

                        // Crear el contenedor de texto del producto
                        const textDiv = document.createElement('div');
                        textDiv.className = 'text';

                        // Crear el título del producto
                        const titleDiv = document.createElement('div');
                        titleDiv.className = 'title';
                        titleDiv.innerHTML = `${producto.Nombre}&reg;`;

                        // Crear la descripción del producto
                        const descDiv = document.createElement('div');
                        descDiv.className = 'desc';
                        descDiv.textContent = producto.Descripcion;

                        // Crear el precio del producto
                        const priceDiv = document.createElement('div');
                        priceDiv.className = 'price';
                        priceDiv.textContent = `Bs ${producto.PrecioUnidadVenta}`;

                        // Crear el mensaje de "No Disponible"
                        const notAvailableText = document.createElement('div');
                        notAvailableText.className = 'not-available-text';
                        notAvailableText.innerHTML = `<div>No Disponible</div>`;

                        // Añadir todos los elementos a su respectivo contenedor
                        textDiv.appendChild(titleDiv);
                        textDiv.appendChild(descDiv);
                        textDiv.appendChild(priceDiv);

                        productNotAvailable.appendChild(imgDiv);
                        productNotAvailable.appendChild(textDiv);
                        productNotAvailable.appendChild(notAvailableText);

                        productContainer.appendChild(productNotAvailable);
                    }

                    // Añadir el contenedor del producto a la fila de productos
                    productRow.appendChild(productContainer);
                });

                // Añadir la fila de productos al contenedor principal
                container.appendChild(productRow);
            }
        }
    });
}

$(document).on('click', '.product', function (e) {
    e.preventDefault();

    var usuario = sessionStorage.getItem('usuario');
    if (!usuario) {
        // Si no hay sesión, redirigir al usuario a la página de login
        $('#modalSesio').modal('show');
        return;
    } else {
        // Obtener los datos del producto del elemento clicado
        const idProducto = $(this).data('id');
        //console.log(idProducto);

        if (typeof idProducto === 'undefined') {
            swal("Mensaje", "El producto no está disponible", "warning");
            return; // Detener ejecución si el ID del producto no está disponible
        }

        const nombre = $(this).data('nombre');
        const descripcion = $(this).data('descripcion');
        const precio = $(this).data('precio');
        const imagen = $(this).data('imagen');

        // Pasar los datos al modal
        $('#txtIdProducto').val(idProducto); // ID del producto
        $('#txtNombPro').val(nombre);
        $('#txtPresPro').val(precio);
        $('#txtImgPro').val(imagen);

        $('.modal-pos-product-img .img').css('background-image', `url(${imagen})`); // Imagen del producto
        $('.modal-pos-product-info .fw-bold.fs-4').text(nombre); // Nombre del producto
        $('.modal-pos-product-info .text-body').text(descripcion); // Descripción del producto
        $('.modal-pos-product-info .fw-bolder.mb-3').text(`Bs ${precio}`); // Precio del producto

        // Abrir el modal
        $('#modalPos').modal('show');
    }

    
});

$('#btnIniciarSesiC').on('click', function () {

    if ($("#txtuser").val().trim() === "" || $("#txtpassword").val().trim() === "") {
        toastr.warning("", "Debe Ingrese un Correo y Contraseña")
        return false;
    }
    
    loginUsuarioLoad();
})

$(document).on('click', '#sesioTaba', function () {
    var usuario = sessionStorage.getItem('usuario');

    if (!usuario) {
        // Si no hay sesión, abre el modal para iniciar sesión
        $('#modalSesio').modal('show');
    } else {
        swal({
            title: "Esta seguro de cerrar sesión?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-primary",
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: true
        },

            function (respuesta) {
                if (respuesta) {
                    sessionStorage.clear();
                    window.location.reload();
                }

            });
        // Si hay sesión, limpiar sesión y recargar la página
        //sessionStorage.clear();
        //window.location.reload();
    }
});

function loginUsuarioLoad() {

    $.ajax({
        type: "POST",
        url: "Default.aspx/IniciarCli",
        data: JSON.stringify({ Usuario: $("#txtuser").val(), Clave: $("#txtpassword").val() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $("#loadSe").LoadingOverlay("show");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadSe").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            $("#loadSe").LoadingOverlay("hide");
            if (response.d.Estado) {
                sessionStorage.setItem('usuario', JSON.stringify(response.d.Data));
                CargarDatos(response.d.Data.IdCliente);
                $('#modalSesio').modal('hide');
                swal("Mensaje", "Sesion Iniciada", "success");

                // Cambiar el texto de "Login" a "Salir"
                $("#sesioTaba").text('Salir');

            } else {
                swal("oops!", "No se encontro el Cliente", "warning")
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Seleccionamos los botones de aumentar y disminuir
    const minusBtn = document.querySelector('.option-row .fa-minus').parentElement;
    const plusBtn = document.querySelector('.option-row .fa-plus').parentElement;
    const qtyInput = document.getElementById('cantidadpe');

    // Evento para disminuir la cantidad
    minusBtn.addEventListener('click', function (e) {
        e.preventDefault();  // Prevenir el comportamiento por defecto del enlace
        let currentQty = parseInt(qtyInput.value);  // Obtener la cantidad actual
        if (currentQty > 1) {
            qtyInput.value = currentQty - 1;  // Disminuir la cantidad si es mayor a 1
        }
    });

    // Evento para aumentar la cantidad
    plusBtn.addEventListener('click', function (e) {
        e.preventDefault();  // Prevenir el comportamiento por defecto del enlace
        let currentQty = parseInt(qtyInput.value);  // Obtener la cantidad actual
        qtyInput.value = currentQty + 1;  // Aumentar la cantidad
    });

    // Restablecer el valor de cantidad cuando se abre el modal
    const modal = document.getElementById('modalPos');
    modal.addEventListener('shown.bs.modal', function () {
        qtyInput.value = 1;  // Reiniciar la cantidad a 1 cada vez que se muestra el modal
    });
});


function cargarCategoD() {

    $.ajax({
        type: "POST",
        url: "FrmProductos.aspx/ObtenerCatego",
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                const listCategorias = data.d.Data;
                const navTabs = document.querySelector('.nav.nav-tabs');

                // Limpiar el contenedor de categorías antes de llenarlo
                navTabs.innerHTML = '';

                // Añadir opción "Ver Todo" de forma estática
                const verTodo = document.createElement('li');
                verTodo.className = 'nav-item';
                verTodo.innerHTML = `
                    <a class="nav-link active" href="#" data-filter="all">
                        <div class="nav-icon"><i class="fa fa-fw fa-utensils"></i></div>
                        <div class="nav-text">Ver Todo</div>
                    </a>`;
                navTabs.appendChild(verTodo);

                // Iterar sobre cada categoría
                listCategorias.forEach(categoria => {
                    // Crear el elemento <li> para la categoría
                    const li = document.createElement('li');
                    li.className = 'nav-item';

                    // Crear el enlace de la categoría
                    li.innerHTML = `
                        <a class="nav-link" href="#" data-filter="${categoria.Descripcion}">
                            <div class="nav-icon"><i class="fa fa-fw fa-cookie-bite"></i></div>
                            <div class="nav-text">${categoria.Descripcion}</div>
                        </a>`;

                    // Añadir la categoría al menú de navegación
                    navTabs.appendChild(li);
                });
            }
        }
    });
}

$(document).on('click', '.pos-menu [data-filter]', function (e) {
    e.preventDefault();

    // Quitar la clase 'active' de todos los elementos dentro del menú de categorías
    $('.pos-menu [data-filter]').not(this).removeClass('active');

    // Agregar la clase 'active' al enlace clicado
    $(this).addClass('active');

    const filter = $(this).data('filter');

    if (filter === 'all') {
        // Mostrar todos los productos
        $('.product-container').show();
    } else {
        // Ocultar todos los productos y mostrar solo los que coinciden con la categoría seleccionada
        $('.product-container').hide();
        $(`.product-container[data-type="${filter}"]`).show();
    }
});


function actualizarCantidadCarrito() {
    const cantidad = ProductosParaReserva.length;
    $('#vercarrt').html(`${cantidad} Item${cantidad !== 1 ? 's' : ''}`);

    // Actualiza la cantidad en la insignia del móvil
    $('#cantimobil').html(cantidad);
}

//etiqueta <a> no es boton
$('#btnAddca').on('click', function (e) {
    e.preventDefault(); // Evita que el enlace siga el href
    var idPro = parseInt($("#txtIdProducto").val().trim());
    let producto_encontrado = ProductosParaReserva.filter(p => p.idProductoa == idPro)
    if (producto_encontrado.length > 0) {
        toastr.warning("", "El producto ya fue agregado")
        return false;
    }

    var canti = parseInt($("#cantidadpe").val().trim());
    var precioProducto = parseFloat($("#txtPresPro").val().trim());
    let producto = {
        idProductoa: parseInt($("#txtIdProducto").val()),
        nombreProductoa: $("#txtNombPro").val(),
        imagena: $("#txtImgPro").val(),
        cantidada: canti,
        precioProductoa: precioProducto,
        totala: (parseFloat(canti) * precioProducto)
    }
    ProductosParaReserva.push(producto)
    actualizarCantidadCarrito();
    mostrarProductos_Precio();
    $('#modalPos').modal('hide');

});

function mostrarProductos_Precio() {
    let total = 0;
    let cantiTot = 0;

    // Limpiar el contenedor antes de llenarlo
    //const posTable = document.querySelector('.pos-table');
    const posTable = document.querySelector('#newOrderTab .pos-table');
    posTable.innerHTML = ''; // Esto limpia el contenido anterior

    ProductosParaReserva.forEach((item, index) => {
        // Sumar el total y la cantidad total
        total += parseFloat(item.totala);
        cantiTot += parseInt(item.cantidada);

        // Crear el div para cada producto
        const productRow = `
            <div class="row pos-table-row">
                <div class="col-9">
                    <div class="pos-product-thumb">
                        <div class="img" style="background-image: url(${item.imagena})"></div>
                        <div class="info">
                            <div class="title">${item.nombreProductoa}</div>
                            <div class="single-price">Bs ${item.precioProductoa}</div>
                            <div class="desc">Cantidad: ${item.cantidada}</div>
                        </div>
                    </div>
                </div>
                <div class="col-3" style="text-align: right">
                    <div class="total-price" style="margin-bottom: 4px">Bs ${item.totala}</div>
                    <a href="#" class="btn btn-danger btn-icon btn-circle btn-lg" onclick="eliminarProducto(${index})"><i class="fas fa-trash"></i></a>
                </div>
            </div>
        `;

        // Insertar el producto en el contenedor
        posTable.insertAdjacentHTML('beforeend', productRow);
    });

    // Actualizar los totales en el pie de la barra lateral
    document.querySelector('.pos-sidebar-footer .text-end.mb-0').textContent = `Unds ${cantiTot}`;
    document.querySelector('.pos-sidebar-footer .h4.mb-0').textContent = `Bs ${total.toFixed(2)}`;
}

function eliminarProducto(index) {
    // Eliminar el producto del array
    ProductosParaReserva.splice(index, 1);

    // Actualizar la vista
    mostrarProductos_Precio();
    actualizarCantidadCarrito();
}

$('#btnTerminarReserv').on('click', function (e) {
    e.preventDefault();
    if (ProductosParaReserva.length < 1) {
        swal("Mensaje", "Debe registrar mínimo un producto en la reserva", "warning");
        return;
    }
    $('#modalFin').modal('show');
    //$("#btnTerminarReserv").LoadingOverlay("show");
});

$('#btnTerminarFin').on('click', function () {
    enviarReserva();
    //$("#btnTerminarReserv").LoadingOverlay("show");
});

function enviarReserva() {
    var usuario = sessionStorage.getItem('usuario');
    var usuarioObj = JSON.parse(usuario);
    var idcliente = usuarioObj.IdCliente;

    var fechaReseStra = $("#txtFechaRese").val().trim();

    var fechaResePartsa = fechaReseStra.split('/');
    var fechaResea = new Date(fechaResePartsa[2], fechaResePartsa[1] - 1, fechaResePartsa[0]);


    var fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);  // Establecer la hora en 00:00:00


    if (fechaResea <= fechaActual) {
        swal("Mensaje", "Debe ingresar una fecha mayor a la actual", "warning");
        return;
    }

    $("#btnTerminarFin").LoadingOverlay("show");

    var total = 0;
    var totallprodu = 0;
    var est = "Confirmado";
    var DETALLE = "";
    var RESERVA = "";
    var DETALLE_RESERVA = "";
    var DATOS_RESERVA = "";

    ProductosParaReserva.forEach((item) => {
        totallprodu = totallprodu + parseInt(item.cantidada);
        total += parseFloat(item.totala);

        DATOS_RESERVA = DATOS_RESERVA + "<DATOS>" +
            "<IdReserva>0</IdReserva>" +
            "<IdProducto>" + item.idProductoa + "</IdProducto>" +
            "<Cantidad>" + item.cantidada + "</Cantidad>" +
            "<PrecioUnidad>" + item.precioProductoa + "</PrecioUnidad>" +
            "<ImporteTotal>" + item.totala + "</ImporteTotal>" +
            "</DATOS>";
    });

    // Obtener la fecha y formatearla en YYYY-MM-DDTHH:MM:SS
    var fechaRese = $("#txtFechaRese").val();
    var fechaParts = fechaRese.split('/');
    var formattedDate = fechaParts[2] + '-' + (fechaParts[1].length < 2 ? '0' : '') + fechaParts[1] + '-' + (fechaParts[0].length < 2 ? '0' : '') + fechaParts[0] + 'T00:00:00';

    var horaReser = $("#timepicker2").val();

    RESERVA = "<RESERVA>" +
        "<IdCliente>" + idcliente + "</IdCliente>" +
        "<CantidadProducto>" + ProductosParaReserva.length + "</CantidadProducto>" +
        "<CantidadTotal>" + totallprodu + "</CantidadTotal>" +
        "<TotalCosto>" + total + "</TotalCosto>" +
        "<Comentario>" + $("#txtcomentario").val() + "</Comentario>" +
        "<Estado>" + est + "</Estado>" +
        "<FechaSolicitado>" + formattedDate + "</FechaSolicitado>" +
        "<Hora>" + horaReser + "</Hora>" +
        "</RESERVA>";

    DETALLE_RESERVA = "<DETALLE_RESERVA>" + DATOS_RESERVA + "</DETALLE_RESERVA>";
    DETALLE = "<DETALLE>" + RESERVA + DETALLE_RESERVA + "</DETALLE>";

    var request = { xml: DETALLE };

    $.ajax({
        type: "POST",
        url: "Default.aspx/GuardarReservaIdCliente",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            $("#btnTerminarFin").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            $("#btnTerminarFin").LoadingOverlay("hide");
            if (response.d.Estado) {
                ProductosParaReserva = [];
                mostrarProductos_Precio();
                actualizarCantidadCarrito();
                $("#txtcomentario").val("");

                $('#modalFin').modal('hide');
                swal("Mensaje", "Su reserva fue realizada exitosamente", "success");
                CargarDatos(idcliente);

            } else {
                swal("Mensaje", response.d.Mensaje, "error");
            }
        }
    });
}


$('#btnGuardarRT').on('click', function () {

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }

    $("#btnGuardarRT").LoadingOverlay("show");

    var request = {
        oCliente: {
            NumeroDocumento: $("#txtnumerodocT").val(),
            Nombre: $("#txtnombreT").val(),
            Direccion: $("#txtDireccionT").val(),
            Telefono: $("#txtCelularT").val(),
            Clave: $("#txtClaveT").val(),
            IdRol: 2
        }
    };

    $.ajax({
        type: "POST",
        url: "Default.aspx/GuardarRegi",
        data: JSON.stringify(request),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            $("#btnGuardarRT").LoadingOverlay("hide");
            if (response.d.Estado) {

                $("#txtnumerodocT").val("");
                $("#txtnombreT").val("");
                $("#txtDireccionT").val("");
                $("#txtCelularT").val("");
                $("#txtClaveT").val("");

                sessionStorage.setItem('usuario', JSON.stringify(response.d.Data));
                CargarDatos(response.d.Data.IdCliente);

                swal("Mensaje", response.d.Mensaje, "success");

                // Cambiar el texto de "Login" a "Salir"
                $("#sesioTaba").text('Salir');

                //swal({
                //    title: "Mensaje",
                //    text: response.d.Mensage,
                //    timer: 2000,
                //    showConfirmButton: false
                //});
                //setTimeout(function () {
                //    window.location.href = 'Login.aspx';
                //}, 3000);

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#btnGuardarRT").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });

    //console.log(request);
})

