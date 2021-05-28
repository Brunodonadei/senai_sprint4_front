using System;
using System.Collections.Generic;

#nullable disable

namespace wishlist_senai_tarde.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            Desejos = new HashSet<Desejo>();
        }

        public int IdUsuario { get; set; }
        public int? IdDesejo { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }

        public virtual Desejo IdDesejoNavigation { get; set; }
        public virtual ICollection<Desejo> Desejos { get; set; }
    }
}
