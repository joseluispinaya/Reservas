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
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<ECliente> IniciarCli(string Usuario, string Clave)
        {
            try
            {
                var oClient = NCliente.GetInstance().Login(Usuario, Clave);
                return oClient != null
                    ? new Respuesta<ECliente> { Estado = true, Data = oClient }
                    : new Respuesta<ECliente> { Estado = false, Data = null };
            }
            catch (Exception ex)
            {
                return new Respuesta<ECliente>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod]
        public static Respuesta<ECliente> GuardarRegi(ECliente oCliente)
        {
            try
            {
                bool respuesta = NCliente.GetInstance().RegistrarCliente(oCliente);
                //bool Respuesta = false;
                if (!respuesta)
                {
                    return new Respuesta<ECliente>
                    {
                        Estado = false,
                        Data = null,
                        Mensaje = "No se pudo registrar el cliente el nro de CI ya existe"
                    };
                }
                var clien = NCliente.GetInstance().Login(oCliente.NumeroDocumento, oCliente.Clave);
                return new Respuesta<ECliente>
                {
                    Estado = true,
                    Mensaje = "Bienvenido su registro fue exitoso ya puede realizar su reserva",
                    Data = clien
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<ECliente> { Estado = false, Data = null, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }
        //metodo sin usar original
        [WebMethod]
        public static Respuesta<bool> Guardar(ECliente oCliente)
        {
            try
            {
                bool respuesta = NCliente.GetInstance().RegistrarCliente(oCliente);
                //bool Respuesta = false;
                var resp = new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Registrado correctamente" : "El numero de Documento ya existe en el Sistema",
                    Valor = respuesta ? "success" : "warning"
                };
                return resp;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message, Valor = "error" };
            }
        }

        [WebMethod]
        public static Respuesta<int> GuardarReservaIdCliente(string xml)
        {
            try
            {
                int respuesta = NReserva.GetInstance().RegistrarReservaNuevoIdclie(xml);
                //var llega = xml;
                //int respuesta = 1;
                if (respuesta != 0)
                {
                    //bool not = EnviarNote();
                    return new Respuesta<int>() { Estado = true, Valor = respuesta.ToString() };
                }
                else
                {
                    return new Respuesta<int>() { Estado = false, Mensaje = "No se pudo registrar la reserva." };
                }
            }
            catch (Exception ex)
            {
                return new Respuesta<int>() { Estado = false, Mensaje = $"Error al registrar la reserva: {ex.Message}" };
            }
        }

        [WebMethod]
        public static Respuesta<List<EReserva>> Obtener(int IdCliente)
        {
            Respuesta<List<EReserva>> Lista = NReserva.GetInstance().ObtenerListaReserva();
            var ListaCompleta = Lista.Data;

            if (ListaCompleta != null)
            {
                List<EReserva> listaFiltrada = ListaCompleta.Where(r => r.Cliente.IdCliente == IdCliente).ToList();
                if (listaFiltrada.Count > 0)
                {
                    return new Respuesta<List<EReserva>>() { Estado = true, Data = listaFiltrada };
                }
                else
                {
                    return new Respuesta<List<EReserva>>() { Estado = false, Data = null, Mensaje = "No se encontraron reservas para este cliente." };
                }
                //return new Respuesta<List<EReserva>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EReserva>>() { Estado = false, Data = null };
            }
        }
    }
}