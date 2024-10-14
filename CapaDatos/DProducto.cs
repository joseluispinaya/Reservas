using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DProducto
    {
        #region "PATRON SINGLETON"
        public static DProducto _instancia = null;

        private DProducto()
        {

        }

        public static DProducto GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DProducto();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<List<EProducto>> ObtenerProductos()
        {
            try
            {
                List<EProducto> rptLista = new List<EProducto>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerProductos", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EProducto()
                                {
                                    IdProducto = Convert.ToInt32(dr["IdProducto"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    ValorCodigo = Convert.ToInt32(dr["ValorCodigo"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Descripcion = dr["DescripcionProducto"].ToString(),
                                    Imagen = dr["Foto"].ToString(),
                                    IdCategoria = Convert.ToInt32(dr["IdCategoria"]),
                                    PrecioUnidadVenta = float.Parse(dr["PrecioUnidadVenta"].ToString()),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    Categoria = new ECategoria() { Descripcion = dr["DescripcionCategoria"].ToString() }
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EProducto>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "productos obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EProducto>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarProducto(EProducto producto)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarProducto", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", producto.Nombre);
                        cmd.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                        cmd.Parameters.AddWithValue("@Foto", producto.Imagen);
                        cmd.Parameters.AddWithValue("@IdCategoria", producto.IdCategoria);
                        cmd.Parameters.AddWithValue("@PrecioUnidadVenta", producto.PrecioUnidadVenta);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar Intente más tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> ActualizarProducto(EProducto producto)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarProducto", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdProducto", producto.IdProducto);
                        cmd.Parameters.AddWithValue("@Nombre", producto.Nombre);
                        cmd.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                        cmd.Parameters.AddWithValue("@Foto", producto.Imagen);
                        cmd.Parameters.AddWithValue("@IdCategoria", producto.IdCategoria);
                        cmd.Parameters.AddWithValue("@PrecioUnidadVenta", producto.PrecioUnidadVenta);
                        cmd.Parameters.AddWithValue("@Activo", producto.Activo);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se Actualizo correctamente" : "Error al Actualizar intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

    }
}
