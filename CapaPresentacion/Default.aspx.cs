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
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<ECliente> IniciarCli(string Usuario, string Clave)
        {
            try
            {
                var oClient = NCliente.GetInstance().Login(Usuario, Clave);
                return oClient != null
                    ? new Respuesta<ECliente> { Estado = true, Data = oClient }
                    : new Respuesta<ECliente> { Estado = false, Data = null };
            }
            catch (Exception ex)
            {
                return new Respuesta<ECliente>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod]
        public static Respuesta<int> GuardarReservaIdCliente(string xml)
        {
            try
            {
                int respuesta = NReserva.GetInstance().RegistrarReservaNuevoIdclie(xml);
                //var llega = xml;
                //int respuesta = 1;
                if (respuesta != 0)
                {
                    //bool not = EnviarNote();
                    return new Respuesta<int>() { Estado = true, Valor = respuesta.ToString() };
                }
                else
                {
                    return new Respuesta<int>() { Estado = false, Mensaje = "No se pudo registrar la reserva." };
                }
            }
            catch (Exception ex)
            {
                return new Respuesta<int>() { Estado = false, Mensaje = $"Error al registrar la reserva: {ex.Message}" };
            }
        }
    }
}