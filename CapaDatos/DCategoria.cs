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
    public class DCategoria
    {
        #region "PATRON SINGLETON"
        public static DCategoria _instancia = null;

        private DCategoria()
        {

        }

        public static DCategoria GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DCategoria();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<List<ECategoria>> ObtenerCatego()
        {
            try
            {
                List<ECategoria> rptLista = new List<ECategoria>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerCategorias", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ECategoria()
                                {
                                    IdCategoria = Convert.ToInt32(dr["IdCategoria"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ECategoria>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Categorias obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ECategoria>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<ECategoria>> ObtenerCategorias()
        {
            try
            {
                List<ECategoria> rptListaCategorias = new List<ECategoria>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    // Paso 1: Obtener las categorías
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerCategorias", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                ECategoria categoria = new ECategoria()
                                {
                                    IdCategoria = Convert.ToInt32(dr["IdCategoria"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    ListaProducto = new List<EProducto>() // Inicializamos la lista vacía
                                };

                                rptListaCategorias.Add(categoria);
                            }
                        }
                    }

                    // Paso 2: Obtener los productos para cada categoría
                    foreach (var categoria in rptListaCategorias)
                    {
                        using (SqlCommand productoCmd = new SqlCommand("usp_ObtenerProductosPorCategoria", con))
                        {
                            productoCmd.CommandType = CommandType.StoredProcedure;
                            productoCmd.Parameters.AddWithValue("@IdCategoria", categoria.IdCategoria);

                            using (SqlDataReader productoDr = productoCmd.ExecuteReader())
                            {
                                while (productoDr.Read())
                                {
                                    EProducto producto = new EProducto()
                                    {
                                        IdProducto = Convert.ToInt32(productoDr["IdProducto"]),
                                        Codigo = productoDr["Codigo"].ToString(),
                                        ValorCodigo = Convert.ToInt32(productoDr["ValorCodigo"]),
                                        Nombre = productoDr["Nombre"].ToString(),
                                        Descripcion = productoDr["Descripcion"].ToString(),
                                        Imagen = productoDr["Foto"].ToString(),
                                        PrecioUnidadVenta = float.Parse(productoDr["PrecioUnidadVenta"].ToString()),
                                        Activo = Convert.ToBoolean(productoDr["Activo"])
                                    };

                                    categoria.ListaProducto.Add(producto);
                                }
                            }
                        }
                    }
                }

                // Si llegamos aquí, la operación fue exitosa
                return new Respuesta<List<ECategoria>>()
                {
                    Estado = true,
                    Data = rptListaCategorias,
                    Mensaje = "Categorías y productos obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Manejo de errores y retorno en caso de excepción
                return new Respuesta<List<ECategoria>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error al obtener las categorías: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
