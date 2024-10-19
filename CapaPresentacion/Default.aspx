<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="CapaPresentacion.Default" %>

<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8" />
    <title>Reservas</title>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <!-- ================== BEGIN core-css ================== -->
    <link href="assets/css/vendor.min.css" rel="stylesheet" />
    <link href="assets/css/default/app.min.css" rel="stylesheet" />
    <!-- ================== END core-css ================== -->
	<link href="vendor/toastr/toastr.min.css" rel="stylesheet">
	<link href="vendor/sweetalert/sweetalert.css" rel="stylesheet">

	<link href="assets/bootstrap-timepicker/css/bootstrap-timepicker.min.css" rel="stylesheet" />
    <%--<link href="assets/bootstrap-datepicker/dist/css/bootstrap-datepicker.css" rel="stylesheet" />--%>
	<link href="assets/jquery-ui-1.12.1/jquery-ui.css" rel="stylesheet"/>
	<%--<link href="assets/jquery-ui-1.12.1/jquery-ui.css" rel="stylesheet"/>
	<link href="assets/timepicker/bootstrap-timepicker.min.css" rel="stylesheet"/>--%>
</head>
<body class='pace-top'>
	<!-- BEGIN #loader -->
	<div id="loader" class="app-loader">
		<span class="spinner"></span>
	</div>
    <div id="app" class="app app-content-full-height app-without-sidebar app-without-header">
		<div id="content" class="app-content p-0">
			<!-- BEGIN pos -->
			<div class="pos pos-with-menu pos-with-sidebar" id="pos">
				<!-- BEGIN pos-menu -->
				<div class="pos-menu">
					<div class="logo">
						<a href="Login.aspx">
							<div class="logo-img"><i class="fa fa-bowl-rice"></i></div>
							<div class="logo-text">El Tropical</div>
						</a>
					</div>
					<div class="nav-container">
						<div data-scrollbar="true" data-height="100%" data-skip-mobile="true">
							<ul class="nav nav-tabs">
							</ul>
						</div>
					</div>
				</div>
				<!-- END pos-menu -->
				
				<!-- BEGIN pos-content -->

                <div class="pos-content">
                    <div class="pos-content-container h-100">
                    </div>
                </div>

				<!-- END pos-content -->
				
				<!-- BEGIN pos-sidebar -->

                <div class="pos-sidebar">
                    <div class="h-100 d-flex flex-column p-0">
                        <!-- Encabezado de la barra lateral -->
                        <div class="pos-sidebar-header">
                            <div class="back-btn">
                                <button type="button" data-dismiss-class="pos-sidebar-mobile-toggled" data-target="#pos"
                                    class="btn border-0">
                                    <i class="fa fa-chevron-left"></i>
                                </button>
                            </div>
                            <div class="icon"><i class="fa fa-plate-wheat"></i></div>
                            <div class="title">Detalle</div>
                            <div class="order">Pedido: <b>#0056</b></div>
                        </div>

                        <!-- Navegación dentro de la barra lateral -->
                        <div class="pos-sidebar-nav">
                            <ul class="nav nav-tabs nav-fill">
                                <li class="nav-item">
                                    <a id="vercarrt" class="nav-link active" href="#" data-bs-toggle="tab" data-bs-target="#newOrderTab">0 Item
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#orderHistoryTab">Historial (0)
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <!-- Cuerpo de la barra lateral donde se mostrarán los productos -->
                        <div class="pos-sidebar-body tab-content" data-scrollbar="true" data-height="100%">
                            <!-- Sección de la nueva orden donde se insertarán los productos dinámicamente -->
                            <div class="tab-pane fade h-100 show active" id="newOrderTab">
                                <div class="pos-table">
                                    <!-- Los productos serán insertados dinámicamente aquí -->
                                </div>
                            </div>

                            <!-- Historial de órdenes (vacio por ahora) -->
                            <div class="tab-pane fade h-100" id="orderHistoryTab">
                                <div class="h-100 d-flex align-items-center justify-content-center text-center p-20">
                                    <div>
                                        <div class="mb-3 mt-n5"></div>
                                        <h4>Sin historial</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Pie de la barra lateral con totales -->
                        <div class="pos-sidebar-footer">
                            <div class="d-flex align-items-center mb-2">
                                <div>Can Total</div>
                                <div class="flex-1 text-end h6 mb-0">0</div>
                            </div>
                            <div class="d-flex align-items-center">
                                <div>Iva (6%)</div>
                                <div class="flex-1 text-end h6 mb-0">Bs 2.12</div>
                            </div>
                            <hr class="opacity-1 my-10px">
                            <div class="d-flex align-items-center mb-2">
                                <div>Total</div>
                                <div class="flex-1 text-end h4 mb-0">Bs 0</div>
                                <!-- Este es el total dinámico -->
                            </div>

                            <!-- Botones del pie de la barra lateral -->
                            <div class="d-flex align-items-center mt-3">
                                <a href="#" class="btn btn-default rounded-3 text-center me-10px w-70px">
                                    <i class="fa fa-bell d-block fs-18px my-1"></i>Servicios
                                </a>
                                <a href="#" class="btn btn-default rounded-3 text-center me-10px w-70px">
                                    <i class="fa fa-receipt d-block fs-18px my-1"></i>Nota
                                </a>
                                <a href="#" id="btnTerminarReserv" class="btn btn-theme rounded-3 text-center flex-1">
                                    <i class="fa fa-shopping-cart d-block fs-18px my-1"></i>Ordenar ya
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

				<%--<div class="pos-sidebar">
					<div class="h-100 d-flex flex-column p-0">
						<div class="pos-sidebar-header">
							<div class="back-btn">
								<button type="button" data-dismiss-class="pos-sidebar-mobile-toggled" data-target="#pos" class="btn border-0">
									<i class="fa fa-chevron-left"></i>
								</button>
							</div>
							<div class="icon"><i class="fa fa-plate-wheat"></i></div>
							<div class="title">Table 01</div>
							<div class="order">Order: <b>#0056</b></div>
						</div>
						<div class="pos-sidebar-nav">
							<ul class="nav nav-tabs nav-fill">
								<li class="nav-item">
									<a class="nav-link active" href="#" data-bs-toggle="tab" data-bs-target="#newOrderTab">New Order (5)</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#orderHistoryTab">Order History (0)</a>
								</li>
							</ul>
						</div>
						<div class="pos-sidebar-body tab-content" data-scrollbar="true" data-height="100%">
							<div class="tab-pane fade h-100 show active" id="newOrderTab">
								<div class="pos-table">
									<div class="row pos-table-row">
										<div class="col-9">
											<div class="pos-product-thumb">
												<div class="img" style="background-image: url(../assets/img/pos/product-2.jpg)"></div>
												<div class="info">
													<div class="title">Grill Pork Chop</div>
													<div class="single-price">$12.99</div>
													<div class="desc">- size: large</div>
													<div class="input-group qty">
														<div class="input-group-append">
															<a href="#" class="btn btn-default"><i class="fa fa-minus"></i></a>
														</div>
														<input type="text" class="form-control" value="01" />
														<div class="input-group-prepend">
															<a href="#" class="btn btn-default"><i class="fa fa-plus"></i></a>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-3 total-price">$12.99</div>
									</div>
									<div class="row pos-table-row">
										<div class="col-9">
											<div class="pos-product-thumb">
												<div class="img" style="background-image: url(../assets/img/pos/product-8.jpg)"></div>
												<div class="info">
													<div class="title">Orange Juice</div>
													<div class="single-price">$5.00</div>
													<div class="desc">
														- size: large<br />
														- less ice
													</div>
													<div class="input-group qty">
														<div class="input-group-append">
															<a href="#" class="btn btn-default"><i class="fa fa-minus"></i></a>
														</div>
														<input type="text" class="form-control" value="02" />
														<div class="input-group-prepend">
															<a href="#" class="btn btn-default"><i class="fa fa-plus"></i></a>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-3 total-price">$10.00</div>
									</div>
									<div class="row pos-table-row">
										<div class="col-9">
											<div class="pos-product-thumb">
												<div class="img" style="background-image: url(../assets/img/pos/product-1.jpg)"></div>
												<div class="info">
													<div class="title">Grill chicken chop</div>
													<div class="single-price">$10.99</div>
													<div class="desc">
														- size: large<br />
														- spicy: medium
													</div>
													<div class="input-group qty">
														<div class="input-group-append">
															<a href="#" class="btn btn-default"><i class="fa fa-minus"></i></a>
														</div>
														<input type="text" class="form-control" value="01" />
														<div class="input-group-prepend">
															<a href="#" class="btn btn-default"><i class="fa fa-plus"></i></a>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-3 total-price">$10.99</div>
									</div>
									<div class="row pos-table-row">
										<div class="col-9">
											<div class="pos-product-thumb">
												<div class="img" style="background-image: url(../assets/img/pos/product-5.jpg)"></div>
												<div class="info">
													<div class="title">Hawaiian Pizza</div>
													<div class="single-price">$15.00</div>
													<div class="desc">
														- size: large<br />
														- more onion
													</div>
													<div class="input-group qty">
														<div class="input-group-append">
															<a href="#" class="btn btn-default"><i class="fa fa-minus"></i></a>
														</div>
														<input type="text" class="form-control" value="01" />
														<div class="input-group-prepend">
															<a href="#" class="btn btn-default"><i class="fa fa-plus"></i></a>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-3 total-price">$15.00</div>
										<div class="pos-remove-confirmation">
											<div class="text-center mx-auto">
												<div><i class="far fa-trash-can fa-2x text-body text-opacity-50"></i></div>
												<div class="mt-1 mb-2">Confirm to remove this item? </div>
												<div>
													<a href="#" class="btn btn-default w-60px me-2">No</a>
													<a href="#" class="btn btn-danger w-60px">Yes</a>
												</div>
											</div>
										</div>
									</div>
									<div class="row pos-table-row">
										<div class="col-9">
											<div class="pos-product-thumb">
												<div class="img" style="background-image: url(../assets/img/pos/product-10.jpg)"></div>
												<div class="info">
													<div class="title">Mushroom Soup</div>
													<div class="single-price">$3.99</div>
													<div class="desc">
														- size: large<br />
														- more cheese
													</div>
													<div class="input-group qty">
														<div class="input-group-append">
															<a href="#" class="btn btn-default"><i class="fa fa-minus"></i></a>
														</div>
														<input type="text" class="form-control" value="01" />
														<div class="input-group-prepend">
															<a href="#" class="btn btn-default"><i class="fa fa-plus"></i></a>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-3 total-price">$3.99</div>
									</div>
								</div>
							</div>
							<div class="tab-pane fade h-100" id="orderHistoryTab">
								<div class="h-100 d-flex align-items-center justify-content-center text-center p-20">
									<div>
										<div class="mb-3 mt-n5">
											<svg width="6em" height="6em" viewBox="0 0 16 16" class="text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
												<path fill-rule="evenodd" d="M14 5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5zM1 4v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4H1z"/>
												<path d="M8 1.5A2.5 2.5 0 0 0 5.5 4h-1a3.5 3.5 0 1 1 7 0h-1A2.5 2.5 0 0 0 8 1.5z"/>
											</svg>
										</div>
										<h4>No order history found</h4>
									</div>
								</div>
							</div>
						</div>
						<div class="pos-sidebar-footer">
							<div class="d-flex align-items-center mb-2">
								<div>Subtotal</div>
								<div class="flex-1 text-end h6 mb-0">$30.98</div>
							</div>
							<div class="d-flex align-items-center">
								<div>Taxes (6%)</div>
								<div class="flex-1 text-end h6 mb-0">$2.12</div>
							</div>
							<hr class="opacity-1 my-10px">
							<div class="d-flex align-items-center mb-2">
								<div>Total</div>
								<div class="flex-1 text-end h4 mb-0">$33.10</div>
							</div>
							<div class="d-flex align-items-center mt-3">
								<a href="#" class="btn btn-default rounded-3 text-center me-10px w-70px"><i class="fa fa-bell d-block fs-18px my-1"></i> Service</a>
								<a href="#" class="btn btn-default rounded-3 text-center me-10px w-70px"><i class="fa fa-receipt d-block fs-18px my-1"></i> Bill</a>
								<a href="#" class="btn btn-theme rounded-3 text-center flex-1"><i class="fa fa-shopping-cart d-block fs-18px my-1"></i> Submit Order</a>
							</div>
						</div>
					</div>
				</div>--%>
			</div>
			<!-- END pos -->
			
			<!-- BEGIN pos-mobile-sidebar-toggler -->
			<a href="#" class="pos-mobile-sidebar-toggler" data-toggle-class="pos-sidebar-mobile-toggled" data-target="#pos">
				<i class="iconify display-6" data-icon="solar:bag-smile-bold-duotone"></i>
				<span class="badge">5</span>
			</a>
			<!-- END pos-mobile-sidebar-toggler -->
		</div>
        <a href="javascript:;" class="btn btn-icon btn-circle btn-theme btn-scroll-to-top" data-toggle="scroll-to-top"><i class="fa fa-angle-up"></i></a>
    </div>
    <!-- END #app -->

	<!-- BEGIN #modalPos -->
    <div class="modal modal-pos fade" id="modalPos">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <a href="#" data-bs-dismiss="modal" class="btn-close position-absolute top-0 end-0 m-4"></a>
                    <div class="modal-pos-product">
                        <div class="modal-pos-product-img">
                            <div class="img" style="background-image: url('')"></div>
                        </div>
                        <div class="modal-pos-product-info">
                            <input id="txtIdProducto" value="0" type="hidden" />
							<input id="txtNombPro" type="hidden" />
							<input id="txtPresPro" type="hidden" />
							<input id="txtImgPro" type="hidden" />
                            <div class="fs-4 fw-bold">Producto Nombre</div>
                            <div class="fs-6 text-body text-opacity-50 mb-2">Producto Descripción</div>
                            <div class="fs-3 fw-bolder mb-3">Bs 0.00</div>
                            <!-- Resto del contenido del modal -->
                            <div class="option-row">
                                <div class="d-flex mb-3">
                                    <a href="#" class="btn btn-default d-flex align-items-center"><i class="fa fa-minus"></i></a>
                                    <input id="cantidadpe" type="text" class="form-control w-30px fw-bold fs-5 px-0 mx-2 text-center border-0" name="qty" value="1">
                                    <a href="#" class="btn btn-default d-flex align-items-center"><i class="fa fa-plus"></i></a>
                                </div>
                            </div>
                            <hr />
                            <div class="mb-3">
                                <div class="fw-bold fs-6">Size</div>
                                <div class="option-list">
                                    <div class="option">
                                        <input type="radio" id="size3" name="size" class="option-input" checked />
                                        <label class="option-label" for="size3">
                                            <span class="option-text">Small</span>
                                            <span class="option-price">+0.00</span>
                                        </label>
                                    </div>
                                    <div class="option">
                                        <input type="radio" id="size1" name="size" class="option-input" />
                                        <label class="option-label" for="size1">
                                            <span class="option-text">Large</span>
                                            <span class="option-price">+3.00</span>
                                        </label>
                                    </div>
                                    <div class="option">
                                        <input type="radio" id="size2" name="size" class="option-input" />
                                        <label class="option-label" for="size2">
                                            <span class="option-text">Medium</span>
                                            <span class="option-price">+1.50</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div class="row gx-3">
                                <div class="col-4">
                                    <a href="#" class="btn btn-default fs-14px rounded-3 fw-bold mb-0 d-block py-3" data-bs-dismiss="modal">Cancelar</a>
                                </div>
                                <div class="col-8">
                                    <a href="#" id="btnAddca" class="btn btn-theme fs-14px rounded-3 fw-bold d-flex justify-content-center align-items-center py-3 m-0">Add Carrito <i class="fa fa-plus ms-3"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
	<!-- END #modalPos -->

    <div class="modal fade" id="modalFin" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modaabelA">Terminar Reserva</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">

                <div class="row">
                    <div class="col-xl-8">
                        <div class="mb-3">
                            <label class="form-label" for="txtcomentario">Comentario</label>
                            <textarea class="form-control" rows="4" id="txtcomentario" placeholder="Igresar algun comentario o detalle"></textarea>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="mb-3">
                            <label class="form-label" for="txtFechaRese">Fecha Reserva</label>
                            <input class="form-control" type="text" id="txtFechaRese" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="timepicker2">Hora Reserva</label>
                            <input class="form-control" type="text" id="timepicker2" />
                        </div>
                    </div>
                </div>
            </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-white" data-bs-dismiss="modal">Cancelar</a>
                    <button id="btnTerminarFin" type="button" class="btn btn-success">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>

	<div class="modal fade" id="modalSesio" tabindex="-1" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content" id="loadSe">
            <div class="modal-header">
                <h4 class="modal-title"><i class="fas fa-user-plus"></i> Iniciar Sesión</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label" for="txtuser">Nro CI</label>
                    <input class="form-control" type="text" id="txtuser" />
                </div>
                <div class="mb-3">
                    <label class="form-label" for="txtpassword">Contraseña</label>
                    <input class="form-control" type="password" id="txtpassword" />
                </div>
                <div class="mb-3">
                    <a class="waves-effect" href="#">Crear una cuenta</a>
                </div>
            </div>
            <div class="modal-footer">
                <a href="javascript:;" class="btn btn-white" data-bs-dismiss="modal">Cancelar</a>
                <button id="btnIniciarSesiC" type="button" class="btn btn-success">Iniciar Sesion</button>
            </div>
        </div>
    </div>
</div>

    <!-- ================== BEGIN core-js ================== -->
	<script src="assets/js/vendor.min.js"></script>
	<script src="assets/js/app.min.js"></script>
	<!-- ================== END core-js ================== -->
	<script src="vendor/toastr/toastr.min.js"></script>
	<script src="vendor/sweetalert/sweetalert.js"></script>
	<script src="vendor/loadingoverlay/loadingoverlay.min.js"></script>
	<!-- ================== BEGIN page-js ================== -->
	<%--<script src="assets/js/demo/pos-customer-order.demo.js"></script>--%>
    <script src="https://code.iconify.design/3/3.1.1/iconify.min.js"></script>

	<%--<script src="assets/jquery-ui-1.12.1/jquery-ui.js"></script>
	<script src="assets/timepicker/bootstrap-timepicker.js"></script>--%>

	<script src="assets/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
    <%--<script src="assets/bootstrap-datepicker/dist/js/bootstrap-datepicker.js"></script>--%>
	<script src="assets/datepicker-es.js"></script>
	<script src="js/Default.js" type="text/javascript"></script>
	<!-- ================== END page-js ================== -->
</body>
</html>
