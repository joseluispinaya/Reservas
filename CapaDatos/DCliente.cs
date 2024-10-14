using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class DCliente
    {
        #region "PATRON SINGLETON"
        public static DCliente _instancia = null;

        private DCliente()
        {

        }

        public static DCliente GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DCliente();
            }
            return _instancia;
        }
        #endregion

        public ECliente Login(string user, string pass)
        {
            ECliente obj = null;
            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand Comando = new SqlCommand("LogeoCliente", con))
                    {
                        Comando.CommandType = CommandType.StoredProcedure;
                        Comando.Parameters.AddWithValue("@User", user);
                        Comando.Parameters.AddWithValue("@Clave", pass);

                        con.Open();
                        using (SqlDataReader dr = Comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new ECliente
                                {
                                    IdCliente = Convert.ToInt32(dr["IdCliente"]),
                                    NumeroDocumento = dr["NumeroDocumento"].ToString(),
                                    Nombre = dr["Nombre"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Telefono = dr["Telefono"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    //Clave = dr["Clave"].ToString(),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    Rol = new ERol() { NomRol = dr["Descripcion"].ToString() }
                                };
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                throw new Exception("Error en la base de datos", ex);
                //obj = null
            }
            catch (Exception ex)
            {
                throw new Exception("Error general", ex);
            }

            return obj;
        }
    }
}
