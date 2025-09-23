

namespace InstitutoAlma.Models
{
    public class Usuario
    {
        //propriedades
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }

        public Usuario(int id, string nome, string email, string senha)
        {
            //verifica se o nome está vazio
            if (string.IsNullOrEmpty(nome))
            {
                Console.WriteLine("AVISO: Tentativa de criar um usuário com nome vazio!");
            }

            Id = id;
            Nome = nome;
            Email = email;
            Senha = senha;
        }
    }
}