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
    public partial class FrmReservas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EReserva>> Obtener()
        {
            try
            {
                Respuesta<List<EReserva>> Lista = NReserva.GetInstance().ObtenerListaReserva();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EReserva>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los reservas: " + ex.Message,
                    Data = null
                };
            }
        }


        [WebMethod]
        public static Respuesta<EReserva> DetalleReservaCale(int IdReserva)
        {
            try
            {
                EReserva oReserva = NReserva.GetInstance().ObtenerDetalleReservaIA(IdReserva);
                if (oReserva != null)
                {
                    return new Respuesta<EReserva>() { Estado = true, Data = oReserva };
                }
                else
                {
                    return new Respuesta<EReserva>() { Estado = false, Data = null, Mensaje = "No se pudo encontrar la reserva" };
                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones
                return new Respuesta<EReserva>() { Estado = false, Data = null, Mensaje = "Error al obtener los reservas: " + ex.Message };
            }
        }
    }
}