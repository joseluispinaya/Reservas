using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ECategoria
    {
        public int IdCategoria { get; set; }
        public string Descripcion { get; set; }
        public bool Activo { get; set; }
        public List<EProducto> ListaProducto { get; set; }
        public int NumeroProductos => ListaProducto == null ? 0 : ListaProducto.Count;
    }
}
