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
    public partial class FrmCategorias : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ECategoria>> ObtenerCatego()
        {
            try
            {
                Respuesta<List<ECategoria>> Lista = NCategoria.GetInstance().ObtenerCategorias();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ECategoria>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los categoria: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> GurdarCatego(ECategoria oCategoria)
        {
            try
            {
                Respuesta<bool> respuesta = NCategoria.GetInstance().RegistrarCategoria(oCategoria);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ActualizarCatego(ECategoria oCategoria)
        {
            try
            {
                Respuesta<bool> respuesta = NCategoria.GetInstance().ActualiCategoria(oCategoria);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
        [WebMethod]
        public static Respuesta<bool> Eliminar(int IdCategoria)
        {
            try
            {
                Respuesta<bool> respuesta = NCategoria.GetInstance().EliminarCategoria(IdCategoria);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}