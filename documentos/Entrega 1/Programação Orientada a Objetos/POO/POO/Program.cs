

using InstitutoAlma.Services;

var doadorService = new DoadorService();

Console.WriteLine(" Cadastrando doadores usando o Serviço ");
doadorService.CadastrarNovoDoador("Ana Pereira", "ana.p@email.com", "senha123", "987.654.321-00", "Pontual");
doadorService.CadastrarNovoDoador("Marcos Andrade", "marcos.a@email.com", "senha456", "111.222.333-44", "Recorrente");

Console.WriteLine("\n Listando todos os doadores cadastrados ");
var todosOsDoadores = doadorService.ListarTodosDoadores();

if (todosOsDoadores.Count == 0)
{
    Console.WriteLine("Nenhum doador cadastrado.");
}
else
{
    Console.WriteLine("Doadores na lista:");
    foreach (var doador in todosOsDoadores)
    {
        Console.WriteLine($"-> ID: {doador.Id}, Nome: {doador.Nome}, Email: {doador.Email}");
    }
}


Console.WriteLine("\nPressione Enter para fechar...");
Console.ReadLine(); 