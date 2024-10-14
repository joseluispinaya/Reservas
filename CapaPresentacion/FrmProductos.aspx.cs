using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;
using System.IO;

namespace CapaPresentacion
{
    public partial class FrmProductos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ECategoria>> ObtenerCatego()
        {
            try
            {
                Respuesta<List<ECategoria>> ListaCom = NCategoria.GetInstance().ObtenerCategorias();
                var lis = ListaCom.Data;
                Respuesta<List<ECategoria>> Lista = NCategoria.GetInstance().ObtenerCatego();
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
        public static Respuesta<List<ECategoria>> ObtenerCategoProdu()
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
        public static Respuesta<List<EProducto>> ObtenerProd()
        {
            try
            {
                Respuesta<List<EProducto>> Lista = NProducto.GetInstance().ObtenerProductos();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EProducto>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productos: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EProducto oProducto, byte[] imageBytes)
        {
            try
            {
                // Instancia de Utilidadesj para evitar múltiples llamadas a getInstance()
                var utilidades = Utilidadesj.GetInstance();

                // Procesar la imagen si existe
                string imageUrl = string.Empty;
                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/ImagenesPro/";
                        imageUrl = utilidades.UploadPhotoA(stream, folder);
                    }
                }

                // Crear objeto EUsuario con los datos
                EProducto obj = new EProducto
                {
                    Nombre = oProducto.Nombre,
                    Descripcion = oProducto.Descripcion,
                    PrecioUnidadVenta = oProducto.PrecioUnidadVenta,
                    Imagen = imageUrl,
                    IdCategoria = oProducto.IdCategoria
                };

                // Registrar el usuario respuesta.Estado
                Respuesta<bool> respuesta = NProducto.GetInstance().RegistrarProducto(obj);

                return respuesta;
            }
            catch (Exception ex)
            {
                // Manejar excepciones
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> EditarProducto(EProducto oProducto, byte[] imageBytes)
        {
            try
            {
                // Validar que el usuario es correcto
                if (oProducto == null || oProducto.IdProducto <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Datos de Producto inválidos" };
                }

                // Obtener el usuario existente
                Respuesta<List<EProducto>> Lista = NProducto.GetInstance().ObtenerProductos();

                var listaP = Lista.Data;
                var item = listaP.FirstOrDefault(x => x.IdProducto == oProducto.IdProducto);
                if (item == null)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Producto no encontrado" };
                }

                // Manejar la imagen, si se proporciona una nueva
                string imageUrl = item.Imagen;  // Mantener la foto actual por defecto

                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/ImagenesPro/";
                        string newImageUrl = Utilidadesj.GetInstance().UploadPhotoA(stream, folder);

                        if (!string.IsNullOrEmpty(newImageUrl))
                        {
                            // Eliminar la imagen anterior si existe
                            if (!string.IsNullOrEmpty(item.Imagen))
                            {
                                string oldImagePath = HttpContext.Current.Server.MapPath(item.Imagen);
                                if (File.Exists(oldImagePath))
                                {
                                    File.Delete(oldImagePath);
                                }
                            }
                            imageUrl = newImageUrl;
                        }
                    }
                }

                // Actualizar los datos del usuario
                item.IdProducto = oProducto.IdProducto;
                item.Nombre = oProducto.Nombre;
                item.Descripcion = oProducto.Descripcion;
                item.PrecioUnidadVenta = oProducto.PrecioUnidadVenta;
                item.Imagen = imageUrl;
                item.IdCategoria = oProducto.IdCategoria;
                item.Activo = oProducto.Activo;

                // Guardar cambios
                Respuesta<bool> respuesta = NProducto.GetInstance().ActualizarProducto(item);
                return respuesta;
            }
            catch (IOException ioEx)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Error al manejar la imagen: " + ioEx.Message };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}