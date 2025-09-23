// Usings necessários para trabalhar com listas e datas.
using System;
using System.Collections.Generic;
using System.Linq;

//======================================================================
// 1. DEFINIÇÃO DAS ESTRUTURAS DE DADOS
//======================================================================

/// <summary>
/// Estrutura de dados que representa uma Atividade da ONG.
/// </summary>
public class Atividade
{
    public string Titulo { get; set; }
    public string Descricao { get; set; }
    public DateTime Data { get; set; }

    // Método para facilitar a exibição dos dados no console.
    public override string ToString()
    {
        return $"Data: {Data:dd/MM/yyyy} - Título: {Titulo}\n  Descrição: {Descricao}\n";
    }
}

/// <summary>
/// Estrutura de dados que representa um Lançamento de Transparência.
/// </summary>
public class ItemTransparencia
{
    public string Descricao { get; set; }
    public decimal Valor { get; set; } // Usamos decimal para valores monetários
    public DateTime DataLancamento { get; set; }
    public string Tipo => Valor >= 0 ? "Receita" : "Despesa"; // Propriedade que calcula o tipo

    // Método para facilitar a exibição dos dados no console.
    public override string ToString()
    {
        return $"Data: {DataLancamento:dd/MM/yyyy} - Tipo: {Tipo} - Valor: R$ {Valor:F2}\n  Descrição: {Descricao}\n";
    }
}

//======================================================================
// PROGRAMA PRINCIPAL
//======================================================================

public class Program
{
    public static void Main(string[] args)
    {
        //-----------------------------------------------------
        // SEÇÃO: NOSSAS ATIVIDADES
        //-----------------------------------------------------
        Console.WriteLine("======= NOSSAS ATIVIDADES =======\n");

        // 2. Criar uma lista com a estrutura de dados de Atividades
        List<Atividade> listaDeAtividades = new List<Atividade>
        {
            new Atividade { Titulo = "Campanha do Agasalho", Descricao = "Arrecadação de roupas de inverno.", Data = new DateTime(2025, 5, 10) },
            new Atividade { Titulo = "Natal Solidário", Descricao = "Distribuição de brinquedos para crianças.", Data = new DateTime(2024, 12, 22) },
            new Atividade { Titulo = "Feira de Adoção de Animais", Descricao = "Parceria com abrigos locais.", Data = new DateTime(2025, 8, 15) }
        };

        Console.WriteLine("--- Lista de Atividades (Original): ---");
        listaDeAtividades.ForEach(Console.WriteLine);

        // 3. Ordenação da Lista (Forma recomendada com LINQ)
        // O método OrderByDescending ordena a lista do maior para o menor (no caso de data, do mais recente para o mais antigo)
        var atividadesOrdenadas = listaDeAtividades.OrderByDescending(a => a.Data).ToList();

        Console.WriteLine("\n--- Lista de Atividades (Ordenada por Data - Mais Recentes Primeiro): ---");
        atividadesOrdenadas.ForEach(Console.WriteLine);
        
        //-----------------------------------------------------
        // SEÇÃO: TRANSPARÊNCIA
        //-----------------------------------------------------
        Console.WriteLine("\n\n======= TRANSPARÊNCIA =======\n");
        
        // 2. Criar uma lista com a estrutura de dados de Transparência
        List<ItemTransparencia> listaDeTransparencia = new List<ItemTransparencia>
        {
            new ItemTransparencia { Descricao = "Doação da Empresa X", Valor = 5000.00m, DataLancamento = new DateTime(2025, 7, 20) },
            new ItemTransparencia { Descricao = "Pagamento de Aluguel", Valor = -1500.00m, DataLancamento = new DateTime(2025, 8, 5) },
            new ItemTransparencia { Descricao = "Venda de produtos na feira", Valor = 850.50m, DataLancamento = new DateTime(2025, 7, 25) },
            new ItemTransparencia { Descricao = "Pagamento de Contas (Luz, Água)", Valor = -450.75m, DataLancamento = new DateTime(2025, 8, 10) }
        };

        Console.WriteLine("--- Lista de Transparência (Original): ---");
        listaDeTransparencia.ForEach(Console.WriteLine);
        
        // 3. Ordenação da Lista (Forma recomendada com LINQ)
        var transparenciaOrdenada = listaDeTransparencia.OrderByDescending(item => item.DataLancamento).ToList();

        Console.WriteLine("\n--- Lista de Transparência (Ordenada por Data - Lançamentos Mais Recentes Primeiro): ---");
        transparenciaOrdenada.ForEach(Console.WriteLine);
        
        
        //-----------------------------------------------------
        // APÊNDICE: IMPLEMENTAÇÃO MANUAL DE ALGORITMO
        //-----------------------------------------------------
        Console.WriteLine("\n\n======= EXEMPLO DE IMPLEMENTAÇÃO MANUAL (BUBBLE SORT) =======\n");
        Console.WriteLine("--- Atividades ordenadas com Bubble Sort (mesmo resultado): ---");
        
        // Criamos uma cópia da lista original para não modificá-la
        List<Atividade> copiaAtividades = new List<Atividade>(listaDeAtividades);
        BubbleSortAtividades(copiaAtividades);
        copiaAtividades.ForEach(Console.WriteLine);
    }

    /// <summary>
    /// Implementação do algoritmo Bubble Sort para ordenar uma lista de Atividades
    /// pela data, da mais recente para a mais antiga.
    /// </summary>
    public static void BubbleSortAtividades(List<Atividade> lista)
    {
        int n = lista.Count;
        for (int i = 0; i < n - 1; i++)
        {
            for (int j = 0; j < n - i - 1; j++)
            {
                // Compara a data do item atual com a do próximo
                // Se a data atual for ANTERIOR à próxima, troca-os de lugar
                // para que as mais recentes "flutuem" para o início.
                if (lista[j].Data < lista[j + 1].Data)
                {
                    // Troca de posição
                    Atividade temp = lista[j];
                    lista[j] = lista[j + 1];
                    lista[j + 1] = temp;
                }
            }
        }
    }
}