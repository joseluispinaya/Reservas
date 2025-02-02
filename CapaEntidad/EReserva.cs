﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EReserva
    {
        public int IdReserva { get; set; }
        public string Codigo { get; set; }
        public int CantidadProducto { get; set; }
        public int CantidadTotal { get; set; }
        public float TotalCosto { get; set; }
        public string Comentario { get; set; }
        public string Estado { get; set; }
        public string FechaReserva { get; set; }
        public DateTime VFechaReserva { get; set; }

        //Nuevo campo
        public string Hora { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public bool Activo { get; set; }
        public ECliente Cliente { get; set; }
        public List<EDetalleReserva> ListaDetalleReserva { get; set; }

        public string Color => Estado == "Confirmado"
            ? "#8BC34A"
            : "#009688";
    }
}
