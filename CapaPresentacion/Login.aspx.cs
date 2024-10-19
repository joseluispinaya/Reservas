using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod]
        public static Respuesta<int> Iniciar(string Usuario, string Clave)
        {
            try
            {
                var ClaveEncri = Utilidadesj.GetInstance().ConvertirSha256(Clave);

                int IdUsuario = NUsuario.GetInstance().LoginUsuarioA(Usuario, ClaveEncri);

                if (IdUsuario != 0)
                {
                    Configuracion.oUsuario = new EUsuario() { IdUsuario = IdUsuario };
                    return new Respuesta<int>() { Estado = true, Valor = IdUsuario.ToString() };
                }
                else
                {
                    return new Respuesta<int>() { Estado = false };
                }
            }
            catch (Exception ex)
            {
                return new Respuesta<int>() { Estado = false, Valor = "Ocurrió un error: " + ex.Message };
            }

        }
    }
}