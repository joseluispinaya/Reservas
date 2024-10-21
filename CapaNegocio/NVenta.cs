using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NVenta
    {
        #region "PATRON SINGLETON"
        private static NVenta daoEmpleado = null;
        private NVenta() { }
        public static NVenta GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NVenta();
            }
            return daoEmpleado;
        }
        #endregion

        public int RegistrarVentaIdclie(string Detalle)
        {
            return DVenta.GetInstance().RegistrarVentaIdclie(Detalle);
        }

        //registro con cliente y sus campos
        public int RegistrarVentaNuev(string Detalle)
        {
            return DVenta.GetInstance().RegistrarVentaNuev(Detalle);
        }
        public int RegistrarVentaIdclieEstado(string Detalle)
        {
            return DVenta.GetInstance().RegistrarVentaIdclieEstado(Detalle);
        }

        public Respuesta<EVenta> ObtenerDetalleVenta(int IdVenta)
        {
            return DVenta.GetInstance().ObtenerDetalleVenta(IdVenta);
        }
        public List<EVenta> ObtenerListaVentaa()
        {
            return DVenta.GetInstance().ObtenerListaVentaa();
        }
    }
}
