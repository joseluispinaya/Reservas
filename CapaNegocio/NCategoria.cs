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

        public Respuesta<bool> RegistrarCategoria(ECategoria producto)
        {
            return DCategoria.GetInstance().RegistrarCategoria(producto);
        }
        public Respuesta<bool> ActualiCategoria(ECategoria producto)
        {
            return DCategoria.GetInstance().ActualiCategoria(producto);
        }
        public Respuesta<bool> EliminarCategoria(int Idcate)
        {
            return DCategoria.GetInstance().EliminarCategoria(Idcate);
        }
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
