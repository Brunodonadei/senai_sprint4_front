using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wishlist_senai_tarde.Domains;

namespace wishlist_senai_tarde.Interfaces
{
    interface IUsuarioRepository
    {
        List<Usuario> ListarTodos();
        void Cadastrar(Usuario novoUsuario);
    }
}
