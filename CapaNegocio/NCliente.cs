using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NCliente
    {
        #region "PATRON SINGLETON"
        private static NCliente daoEmpleado = null;
        private NCliente() { }
        public static NCliente GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NCliente();
            }
            return daoEmpleado;
        }
        #endregion

        public bool RegistrarCliente(ECliente oCliente)
        {
            return DCliente.GetInstance().RegistrarCliente(oCliente);
        }

        public ECliente Login(string user, string pass)
        {
            return DCliente.GetInstance().Login(user, pass);
        }

        public List<ECliente> ObtenerClien()
        {
            return DCliente.GetInstance().ObtenerClien();
        }
        public List<ECliente> ObtenerClienFil(string buscar)
        {
            return DCliente.GetInstance().ObtenerClienFil(buscar);
        }
    }
}
