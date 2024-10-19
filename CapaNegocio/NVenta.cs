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

        public int RegistrarVentaIdclieEstado(string Detalle)
        {
            return DVenta.GetInstance().RegistrarVentaIdclieEstado(Detalle);
        }
    }
}
