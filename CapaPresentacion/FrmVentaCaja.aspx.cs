using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;
using System.Xml.Linq;
using System.Xml;

namespace CapaPresentacion
{
    public partial class FrmVentaCaja : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ECliente>> BuscarClie(string buscar)
        {
            List<ECliente> Lista = NCliente.GetInstance().ObtenerClienFil(buscar);

            if (Lista != null)
            {
                return new Respuesta<List<ECliente>>() { Estado = true, Data = Lista };
            }
            else
            {
                return new Respuesta<List<ECliente>>() { Estado = false, Data = null };
            }
        }

        [WebMethod]
        public static Respuesta<int> GuardarVentaIdCliente(string xml)
        {
            try
            {
                int respuesta = NVenta.GetInstance().RegistrarVentaIdclie(xml);
                if (respuesta != 0)
                {
                    return new Respuesta<int>() { Estado = true, Valor = respuesta.ToString() };
                }
                else
                {
                    return new Respuesta<int>() { Estado = false, Mensaje = "No se pudo registrar la venta." };
                }
            }
            catch (Exception ex)
            {
                return new Respuesta<int>() { Estado = false, Mensaje = $"Error al registrar la venta: {ex.Message}" };
            }
        }

        [WebMethod]
        public static Respuesta<int> GuardarVenta(string xml)
        {
            try
            {
                // Cargar el XML en un XDocument
                XDocument xdoc = XDocument.Parse(xml);
                var nrodocumento = xdoc.Root.Element("DETALLE_CLIENTE")
                                  .Element("DATOS")
                                  .Element("NumeroDocumento").Value;

                List<ECliente> Lista = NCliente.GetInstance().ObtenerClien();
                var item = Lista.FirstOrDefault(x => x.NumeroDocumento == nrodocumento);
                if (item != null)
                {
                    return new Respuesta<int>() { Estado = false, Mensaje = "El numero de CI. ya se encuentra Registrado" };
                }

                int respuesta = NVenta.GetInstance().RegistrarVentaNuev(xml);
                //int respuesta = 1;

                if (respuesta != 0)
                {
                    return new Respuesta<int>() { Estado = true, Valor = respuesta.ToString() };
                }
                else
                {
                    return new Respuesta<int>() { Estado = false, Mensaje = "No se pudo registrar la venta." };
                }
            }
            catch (XmlException xmlEx)
            {
                return new Respuesta<int>() { Estado = false, Mensaje = $"Error al procesar el XML: {xmlEx.Message}" };
            }
            catch (Exception ex)
            {
                return new Respuesta<int>() { Estado = false, Mensaje = $"Error al registrar la venta: {ex.Message}" };
            }
        }
    }
}