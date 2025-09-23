
using InstitutoAlma.Models;

namespace InstitutoAlma.Models
{
    
    // Doador herda todas as propriedades públicas de Usuario (incluindo Id, Nome, etc.)
    public class Doador : Usuario
    {
        public string CpfCnpj { get; set; }
        public string TipoDoador { get; set; }

        public Doador(int id, string nome, string email, string senha, string cpfCnpj, string tipoDoador)
            : base(id, nome, email, senha) 
        {
            CpfCnpj = cpfCnpj;
            TipoDoador = tipoDoador;
        }
    }
}