using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wishlist_senai_tarde.Contexts;
using wishlist_senai_tarde.Domains;
using wishlist_senai_tarde.Interfaces;

namespace wishlist_senai_tarde.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        WishList ctx = new WishList();
        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);
        }

        public List<Usuario> ListarTodos()
        {
            return ctx.Usuarios.ToList();
        }
    }
}
