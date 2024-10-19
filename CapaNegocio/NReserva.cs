using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NReserva
    {
        #region "PATRON SINGLETON"
        private static NReserva daoEmpleado = null;
        private NReserva() { }
        public static NReserva GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NReserva();
            }
            return daoEmpleado;
        }
        #endregion
        public int RegistrarReservaNuevoIdclie(string Detalle)
        {
            return DReserva.GetInstance().RegistrarReservaNuevoIdclie(Detalle);
        }

        public Respuesta<List<EReserva>> ObtenerListaReserva()
        {
            return DReserva.GetInstance().ObtenerListaReserva();
        }
        public EReserva ObtenerDetalleReservaIA(int IdReserva)
        {
            return DReserva.GetInstance().ObtenerDetalleReservaIA(IdReserva);
        }
    }
}
