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
    public partial class FrmConsultaVenta : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static Respuesta<List<EVenta>> ObtenerLista(string fechainicio, string fechafin)
        {
            DateTime desde = Convert.ToDateTime(fechainicio);
            DateTime hasta = Convert.ToDateTime(fechafin);


            List<EVenta> listaCompleta = NVenta.GetInstance().ObtenerListaVentaa();
            List<EVenta> listaFiltrada = listaCompleta
                .Where(venta => venta.VFechaRegistro.Date >= desde && venta.VFechaRegistro.Date <= hasta)
                .ToList();

            if (listaFiltrada != null)
            {
                return new Respuesta<List<EVenta>>() { Estado = true, Data = listaFiltrada };
            }
            else
            {
                return new Respuesta<List<EVenta>>() { Estado = false, Data = null };
            }
        }
    }
}