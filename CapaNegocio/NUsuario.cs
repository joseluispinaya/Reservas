using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NUsuario
    {
        #region "PATRON SINGLETON"
        private static NUsuario daoEmpleado = null;
        private NUsuario() { }
        public static NUsuario GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NUsuario();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarUsuario(EUsuario oUsuario)
        {
            return DUsuario.GetInstance().RegistrarUsuario(oUsuario);
        }

        public Respuesta<bool> ActualizarUsuario(EUsuario oUsuario)
        {
            return DUsuario.GetInstance().ActualizarUsuario(oUsuario);
        }
        public Respuesta<List<EUsuario>> ObtenerUsuarios()
        {
            return DUsuario.GetInstance().ObtenerUsuariosZ();
        }
        public int LoginUsuarioA(string Usuario, string Clave)
        {
            return DUsuario.GetInstance().LoginUsuarioA(Usuario, Clave);
        }

        public List<ERol> ObtenerRol()
        {
            return DUsuario.GetInstance().ObtenerRol();
        }
    }
}
