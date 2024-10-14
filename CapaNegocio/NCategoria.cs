using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NCategoria
    {
        #region "PATRON SINGLETON"
        private static NCategoria daoEmpleado = null;
        private NCategoria() { }
        public static NCategoria GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NCategoria();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<List<ECategoria>> ObtenerCategorias()
        {
            return DCategoria.GetInstance().ObtenerCategorias();
        }

        public Respuesta<List<ECategoria>> ObtenerCatego()
        {
            return DCategoria.GetInstance().ObtenerCatego();
        }
    }
}
