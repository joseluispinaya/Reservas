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
    public partial class FrmUsuarios : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        [WebMethod]
        public static Respuesta<List<ERol>> ObtenerRol()
        {
            List<ERol> Lista = NUsuario.GetInstance().ObtenerRol();

            if (Lista != null)
            {
                // Filtrar la lista para excluir los roles con Idrol igual a 2
                List<ERol> ListaFiltrada = Lista.Where(rol => rol.Idrol != 2).ToList();

                return new Respuesta<List<ERol>>() { Estado = true, Data = ListaFiltrada };
            }
            else
            {
                return new Respuesta<List<ERol>>() { Estado = false, Data = null };
            }
        }

        [WebMethod]
        public static Respuesta<List<EUsuario>> ObtenerUsuario()
        {
            try
            {
                Respuesta<List<EUsuario>> Lista = NUsuario.GetInstance().ObtenerUsuarios();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los usuarios: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EUsuario oUsuario, byte[] imageBytes)
        {
            try
            {
                // Instancia de Utilidadesj para evitar múltiples llamadas a getInstance()
                var utilidades = Utilidadesj.GetInstance();

                // Generar clave aleatoria y encriptarla
                string claveGenerada = utilidades.GenerarClave();
                string claveEncriptada = utilidades.ConvertirSha256(claveGenerada);

                // Procesar la imagen si existe
                string imageUrl = string.Empty;
                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/Imagenes/";
                        imageUrl = utilidades.UploadPhotoA(stream, folder);
                    }
                }

                // Crear objeto EUsuario con los datos
                EUsuario obj = new EUsuario
                {
                    Nombres = oUsuario.Nombres,
                    Apellidos = oUsuario.Apellidos,
                    Correo = oUsuario.Correo,
                    Clave = claveEncriptada,
                    Foto = imageUrl,
                    IdRol = oUsuario.IdRol
                };

                // Registrar el usuario respuesta.Estado
                Respuesta<bool> respuesta = NUsuario.GetInstance().RegistrarUsuario(obj);
                bool resultadoRegistro = respuesta.Estado;

                // Si se registra correctamente, enviar el correo
                if (resultadoRegistro)
                {
                    bool correoEnviado = EnvioCorreoU(obj.Correo, claveGenerada);
                    if (!correoEnviado)
                    {
                        // Manejar el error en el envío del correo (opcional)
                        return new Respuesta<bool>
                        {
                            Estado = true,
                            Mensaje = "El usuario fue registrado, pero hubo un problema al enviar el correo."
                        };
                    }
                }

                // Crear respuesta con el resultado del registro
                return new Respuesta<bool>
                {
                    Estado = resultadoRegistro,
                    Mensaje = resultadoRegistro ? "Registro exitoso. Se envió la clave al correo." : "Error al registrar. Intente con otro correo."
                };
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
        public static Respuesta<bool> EditarUsuario(EUsuario oUsuario, byte[] imageBytes)
        {
            try
            {
                // Validar que el usuario es correcto
                if (oUsuario == null || oUsuario.IdUsuario <= 0)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Datos de usuario inválidos" };
                }

                // Obtener el usuario existente
                Respuesta<List<EUsuario>> Lista = NUsuario.GetInstance().ObtenerUsuarios();

                var listaUsuarios = Lista.Data;
                var item = listaUsuarios.FirstOrDefault(x => x.IdUsuario == oUsuario.IdUsuario);
                if (item == null)
                {
                    return new Respuesta<bool>() { Estado = false, Mensaje = "Usuario no encontrado" };
                }

                // Manejar la imagen, si se proporciona una nueva
                string imageUrl = item.Foto;  // Mantener la foto actual por defecto

                if (imageBytes != null && imageBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(imageBytes))
                    {
                        string folder = "/Imagenes/";
                        string newImageUrl = Utilidadesj.GetInstance().UploadPhotoA(stream, folder);

                        if (!string.IsNullOrEmpty(newImageUrl))
                        {
                            // Eliminar la imagen anterior si existe
                            if (!string.IsNullOrEmpty(item.Foto))
                            {
                                string oldImagePath = HttpContext.Current.Server.MapPath(item.Foto);
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
                item.IdUsuario = oUsuario.IdUsuario;
                item.Nombres = oUsuario.Nombres;
                item.Apellidos = oUsuario.Apellidos;
                item.Correo = oUsuario.Correo;
                item.Foto = imageUrl;
                item.IdRol = oUsuario.IdRol;
                item.Estado = oUsuario.Estado;

                // Guardar cambios
                Respuesta<bool> respuesta = NUsuario.GetInstance().ActualizarUsuario(item);
                return respuesta;
                // bool resultado = NUsuario.GetInstance().ActualizarUsuario(item);

                // return new Respuesta<bool>
                // {
                //     Estado = resultado,
                //     Mensaje = resultado ? "Usuario actualizado correctamente" : "Error al actualizar el usuario, el correo ya existe"
                // };
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

        // Método para enviar el correo al usuario
        private static bool EnvioCorreoU(string correo, string clave)
        {
            try
            {
                // Instanciar Utilidadesj y enviar el correo
                return Utilidadesj.GetInstance().EnviodeCorreo(correo, "Cuenta Creada", "Se creo su cuenta ", clave);
            }
            catch (Exception)
            {
                // Si ocurre un error en el envío del correo, retornar false
                return false;
            }
        }
    }
}