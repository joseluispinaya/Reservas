using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class FrmVentaReserva : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static Respuesta<List<EProducto>> BuscarPro(string buscar)
        {
            List<EProducto> Lista = NProducto.GetInstance().ObtenerProductosFil(buscar);
            //Lista = NUsuario.getInstance().ObtenerUsuarios();

            if (Lista != null)
            {
                return new Respuesta<List<EProducto>>() { Estado = true, Data = Lista };
            }
            else
            {
                return new Respuesta<List<EProducto>>() { Estado = false, Data = null };
            }
        }

        [WebMethod]
        public static Respuesta<int> GuardarVentaIdCliente(string xml)
        {
            try
            {
                int respuesta = NVenta.GetInstance().RegistrarVentaIdclieEstado(xml);
                if (respuesta != 0)
                {
                    var mes = "se registro la venta " + respuesta;
                    return new Respuesta<int>() { Estado = true, Valor = respuesta.ToString(), Mensaje = mes };
                }
                else
                {
                    return new Respuesta<int>() { Estado = false, Mensaje = "No se pudo registrar la venta." };
                }
            }
            catch (Exception ex)
            {
                return new Respuesta<int>() { Estado = false, Mensaje = $"Error al registrar la venta: {ex.Message}" };
            }
        }

        [WebMethod]
        public static Respuesta<EVenta> DetalleVenta(int IdVenta)
        {
            try
            {
                Respuesta<EVenta> oVenta = NVenta.GetInstance().ObtenerDetalleVenta(IdVenta);
                return oVenta;
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return new Respuesta<EVenta>() { Estado = false, Data = null, Mensaje = ex.Message };
            }
        }
    }
}