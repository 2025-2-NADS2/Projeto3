// Arquivo: Services/DoadorService.cs

using InstitutoAlma.Models;
using System.Collections.Generic;
using System.Linq;

namespace InstitutoAlma.Services
{
    public class DoadorService
    {
        //banco de dados temporarios

        private static readonly List<Doador> _doadores = new List<Doador>();

        public Doador CadastrarNovoDoador(string nome, string email, string senha, string cpfCnpj, string tipoDoador)
        {
            if (_doadores.Any(d => d.Email == email))
            {
                System.Console.WriteLine($"ERRO: O email '{email}' já está cadastrado.");
                return null;
            }

            int novoId = _doadores.Any() ? _doadores.Max(d => d.Id) + 1 : 1;
            var novoDoador = new Doador(novoId, nome, email, senha, cpfCnpj, tipoDoador);

            _doadores.Add(novoDoador);

            System.Console.WriteLine($"Doador '{nome}' cadastrado com sucesso com o ID {novoId}!");
            return novoDoador;
        }

        public List<Doador> ListarTodosDoadores()
        {
            return _doadores;
        }
    }
}