

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
    $("#txtFechaRese").datepicker();
    $("#txtFechaRese").val(ObtenerFechaa());

    $('#timepicker2').timepicker({
        showMeridian: false, // Desactiva AM/PM para usar formato de 24 horas
        //minuteStep: 1,       // Opcional, intervalo de minutos
        defaultTime: 'current', // Establece la hora actual como predeterminada
    });

    cargarProductosPorCatego();
    cargarCategoD();
});

let ProductosParaReserva = [];

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
                        productLink.setAttribute('data-bs-toggle', 'modal');
                        productLink.setAttribute('data-bs-target', '#modalPos');

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
    }

    // Obtener los datos del producto del elemento clicado
    const idProducto = $(this).data('id');
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
});

$('#btnIniciarSesiC').on('click', function () {

    if ($("#txtuser").val().trim() === "" || $("#txtpassword").val().trim() === "") {
        toastr.warning("", "Debe Ingrese un Correo y Contraseña")
        return false;
    }
    
    loginUsuarioLoad();
})

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
                $('#modalSesio').modal('hide');
                swal("Mensaje", "Sesion Iniciada", "success");
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

function cargarProductosPorCategoInactivo() {
    $.ajax({
        type: "POST",
        url: "FrmProductos.aspx/ObtenerCategoProdu",
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                const categorias = data.d.Data;
                const container = document.querySelector('.pos-content-container');

                // Limpiar el contenedor antes de llenarlo
                container.innerHTML = '';

                // Iterar sobre cada categoría
                categorias.forEach(categoria => {
                    // Crear un nuevo contenedor para la fila de productos
                    const productRow = document.createElement('div');
                    productRow.className = 'product-row';

                    // Iterar sobre los productos de la categoría
                    categoria.ListaProducto.forEach(producto => {
                        // Crear el contenedor del producto
                        const productContainer = document.createElement('div');
                        productContainer.className = 'product-container';
                        productContainer.setAttribute('data-type', categoria.Descripcion);

                        if (producto.Activo) {
                            // Producto disponible: crear enlace
                            const productLink = document.createElement('a');
                            productLink.href = '#';
                            productLink.className = 'product';
                            productLink.setAttribute('data-bs-toggle', 'modal');
                            productLink.setAttribute('data-bs-target', '#modalPos');

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

                        productRow.appendChild(productContainer);
                    });

                    // Añadir la fila de productos al contenedor principal
                    container.appendChild(productRow);
                });
            }
        }
    });
}
function cargarProductosPorCategoOriginal() {
    $.ajax({
        type: "POST",
        url: "FrmProductos.aspx/ObtenerCategoProdu",
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.Estado) {
                const categorias = data.d.Data;
                //console.log(categorias);
                const container = document.querySelector('.pos-content-container');

                // Limpiar el contenedor antes de llenarlo
                container.innerHTML = '';

                // Iterar sobre cada categoría
                categorias.forEach(categoria => {
                    // Crear un nuevo contenedor para la fila de productos
                    const productRow = document.createElement('div');
                    productRow.className = 'product-row';

                    // Iterar sobre los productos de la categoría
                    categoria.ListaProducto.forEach(producto => {
                        // Crear el contenedor del producto
                        const productContainer = document.createElement('div');
                        productContainer.className = 'product-container';
                        productContainer.setAttribute('data-type', categoria.Descripcion);

                        // Crear el enlace del producto
                        const productLink = document.createElement('a');
                        productLink.href = '#';
                        productLink.className = 'product';
                        productLink.setAttribute('data-bs-toggle', 'modal');
                        productLink.setAttribute('data-bs-target', '#modalPos');

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
                        productRow.appendChild(productContainer);
                    });

                    // Añadir la fila de productos al contenedor principal
                    container.appendChild(productRow);
                });
            }
        }
    });
}

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
    const posTable = document.querySelector('.pos-table');
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
                            <div class="text-center mx-auto">
                                <div>
                                    <a href="#" class="btn btn-danger w-60px" onclick="eliminarProducto(${index})">
                                        <i class="fas fa-trash-alt"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3 total-price">Bs ${item.totala}</div>
            </div>
        `;

        // Insertar el producto en el contenedor
        posTable.insertAdjacentHTML('beforeend', productRow);
    });

    // Actualizar los totales en el pie de la barra lateral
    document.querySelector('.pos-sidebar-footer .text-end.mb-0').textContent = `Nro ${cantiTot}`;
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

                swal("Mensaje", "Su reserva fue realizada exitosamente: " + response.d.Valor, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "error");
            }
        }
    });
}