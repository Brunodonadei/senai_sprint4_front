using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using wishlist_senai_tarde.Domains;

namespace wishlist_senai_tarde.Interfaces
{
    interface IDesejoRepository
    {
        List<Desejo> ListarTodos();
        Desejo BuscarPorId(int id);
        void Cadastrar(Desejo desejo);
        void Atualizar(int id, Desejo desejoAtt);
        void Deletar(int id);
        List<Desejo> ListarComEmail();
    }
}
