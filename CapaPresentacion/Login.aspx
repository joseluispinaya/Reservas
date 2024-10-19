<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CapaPresentacion.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <title>Acceso al Sistema</title>
    <link href="assets/css/vendor.min.css" rel="stylesheet" />
    <link href="vendor/sweetalert/sweetalert.css" rel="stylesheet" />
    <link href="assets/style.css" rel="stylesheet" />
</head>
<body>
    <div class="container">
    
        <div class="main">  
            <form id="form1" runat="server">
            <input type="checkbox" id="chk" aria-hidden="true"/>
    
            <div class="login">
                <div class="form">
                    <label for="chk" aria-hidden="true">EL TROPICAL</label>
                    <input class="input" type="text" name="email" id="username" placeholder="Usuario" />
                    <input class="input" type="password" name="pswd" id="password" placeholder="Contraseña" />
                    <button type="button" id="btnIniciarSesion">Iniciar</button>
                </div>
            </div>
    
            <div class="register">
                <div class="form">
                    <label for="chk" aria-hidden="true">Olvido su Clave</label>
                    <input class="inputs" type="email" name="email" id="cooree" placeholder="ingrese su Correo"/>
                    <input class="inputs" type="text" name="txt" readonly="readonly"/>
                    <br />
                    <h3 class="labeljo">Revice su Correo Electronico</h3>
                    <button type="button" id="btnRecupe">Recuperar</button>
                </div>
            </div>
            </form>
        </div>
    
</div>
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/sweetalert/sweetalert.js"></script>
    <script src="vendor/loadingoverlay/loadingoverlay.min.js"></script>
    
    <script src="js/Login.js" type="text/javascript"></script>
</body>
</html>
