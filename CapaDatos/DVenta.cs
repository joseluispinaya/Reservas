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
    public class DVenta
    {
        #region "PATRON SINGLETON"
        public static DVenta _instancia = null;

        private DVenta()
        {

        }

        public static DVenta GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DVenta();
            }
            return _instancia;
        }
        #endregion

        //registro con Id Cliente para Atender reservas
        public int RegistrarVentaIdclieEstado(string Detalle)
        {
            int respuesta = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarVentaIdEstado", con))
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
            catch (SqlException sqlEx)
            {
                respuesta = 0;
                throw new Exception("Error SQL al registrar la venta", sqlEx);
            }
            catch (Exception ex)
            {
                //respuesta = 0;
                throw new Exception("Error al registrar venta", ex);
            }

            return respuesta;
        }
    }
}
