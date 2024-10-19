using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;
using System.Xml.Linq;
using System.Xml;
using System.Globalization;

namespace CapaDatos
{
    public class DReserva
    {
        #region "PATRON SINGLETON"
        public static DReserva _instancia = null;

        private DReserva()
        {

        }

        public static DReserva GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DReserva();
            }
            return _instancia;
        }
        #endregion

        public int RegistrarReservaNuevoIdclie(string Detalle)
        {
            int respuesta = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarReservaIdCliente", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@Detalle", SqlDbType.Xml).Value = Detalle;
                        cmd.Parameters.Add("@Resultado", SqlDbType.Int).Direction = ParameterDirection.Output;

                        con.Open();
                        cmd.ExecuteNonQuery();

                        respuesta = Convert.ToInt32(cmd.Parameters["@Resultado"].Value);
                    }
                }
            }
            catch (SqlException)
            {
                respuesta = 0;
                //throw new Exception("Error SQL al registrar la reserva", sqlEx);
            }
            catch (Exception)
            {
                respuesta = 0;
                //throw new Exception("Error al registrar reserva", ex);
            }

            return respuesta;
        }

        public Respuesta<List<EReserva>> ObtenerListaReserva()
        {
            try
            {
                List<EReserva> rptListaUsuario = new List<EReserva>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerListaReserva", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new EReserva()
                                {
                                    IdReserva = Convert.ToInt32(dr["IdReserva"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    //FechaReserva = Convert.ToDateTime(dr["FechaSolicitado"].ToString()).ToString("dd/MM/yyyy"),
                                    FechaReserva = Convert.ToDateTime(dr["FechaSolicitado"].ToString()).ToString("yyyy-MM-dd"), // Formato ISO 8601
                                    VFechaReserva = Convert.ToDateTime(dr["FechaSolicitado"].ToString()),
                                    //nuevo agregado
                                    Hora = dr["Hora"].ToString(),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                                    Cliente = new ECliente() { IdCliente = Convert.ToInt32(dr["IdCliente"]), NumeroDocumento = dr["NumeroDocumento"].ToString(), Nombre = dr["Nombre"].ToString() },
                                    CantidadTotal = Convert.ToInt32(dr["CantidadTotal"]),
                                    TotalCosto = float.Parse(dr["TotalCosto"].ToString()),
                                    Comentario = dr["Comentario"].ToString(),
                                    Estado = dr["Estado"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EReserva>>()
                {
                    Estado = true,
                    Data = rptListaUsuario,
                    Mensaje = "reservas obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EReserva>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public EReserva ObtenerDetalleReservaIA(int IdReserva)
        {
            EReserva rptDetalleVenta = null;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ObtenerDetalleReserva", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdReserva", IdReserva);

                        con.Open();

                        using (XmlReader dr = cmd.ExecuteXmlReader())
                        {
                            if (dr.Read())
                            {
                                XDocument doc = XDocument.Load(dr);
                                var detalleReservaElement = doc.Element("DETALLE_RESERVA");

                                if (detalleReservaElement != null)
                                {
                                    rptDetalleVenta = new EReserva
                                    {
                                        Codigo = detalleReservaElement.Element("Codigo").Value,
                                        CantidadTotal = int.Parse(detalleReservaElement.Element("CantidadTotal").Value),
                                        Comentario = detalleReservaElement.Element("Comentario").Value,
                                        Estado = detalleReservaElement.Element("Estado").Value,
                                        TotalCosto = float.Parse(detalleReservaElement.Element("TotalCosto").Value, CultureInfo.InvariantCulture),
                                        FechaReserva = detalleReservaElement.Element("FechaSolicitado").Value,
                                        FechaRegistro = detalleReservaElement.Element("FechaRegistro").Value,
                                        // nuevo agregado
                                        Hora = detalleReservaElement.Element("Hora").Value
                                    };

                                    var detalleClienteElement = detalleReservaElement.Element("DETALLE_CLIENTE");
                                    if (detalleClienteElement != null)
                                    {
                                        rptDetalleVenta.Cliente = new ECliente
                                        {
                                            IdCliente = int.Parse(detalleClienteElement.Element("IdCliente").Value),
                                            Nombre = detalleClienteElement.Element("Nombre").Value,
                                            Direccion = detalleClienteElement.Element("Direccion").Value,
                                            NumeroDocumento = detalleClienteElement.Element("NumeroDocumento").Value,
                                            Telefono = detalleClienteElement.Element("Telefono").Value
                                        };
                                    }

                                    var detalleProductoElement = detalleReservaElement.Element("DETALLE_PRODUCTO");
                                    if (detalleProductoElement != null)
                                    {
                                        rptDetalleVenta.ListaDetalleReserva = detalleProductoElement.Elements("PRODUCTO")
                                            .Select(producto => new EDetalleReserva
                                            {
                                                IdProducto = int.Parse(producto.Element("IdProducto").Value),
                                                Cantidad = int.Parse(producto.Element("Cantidad").Value),
                                                NombreProducto = producto.Element("Nombre").Value,
                                                PrecioUnidad = float.Parse(producto.Element("PrecioUnidad").Value, CultureInfo.InvariantCulture),
                                                ImporteTotal = float.Parse(producto.Element("ImporteTotal").Value, CultureInfo.InvariantCulture)
                                            }).ToList();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Manejo de la excepción
                // Aquí puedes registrar el error en un log, si es necesario
                rptDetalleVenta = null;
                throw new Exception("Error al encontrar el usuario. Intente más tarde.", ex);
            }

            return rptDetalleVenta;
        }
    }
}
