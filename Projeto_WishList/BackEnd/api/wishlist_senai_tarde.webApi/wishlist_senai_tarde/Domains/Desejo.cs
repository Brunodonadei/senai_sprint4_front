using System;
using System.Collections.Generic;

#nullable disable

namespace wishlist_senai_tarde.Domains
{
    public partial class Desejo
    {
        public Desejo()
        {
            Usuarios = new HashSet<Usuario>();
        }

        public int IdDesejo { get; set; }
        public string Descricao { get; set; }
        public int? IdUsuario { get; set; }

        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
