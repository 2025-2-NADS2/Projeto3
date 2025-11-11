# 📄 Entrega 2: Banco de Dados (Projeto Instituto Alma)

Este documento apresenta a entrega da disciplina de Banco de Dados, referente ao **Projeto Interdisciplinar do 2º Semestre de 2025**.

* **Autor:** Gustavo moura
**Tema:** Desenvolvimento de um site institucional para o Instituto Alma.
**Requisito:** "Apresentar em documento a criação de pelo menos uma view englobando consultas".

---

## 🎯 Objetivo da View

No contexto do site do Instituto Alma, informações de diferentes tabelas precisam ser combinadas frequentemente. Por exemplo, para exibir a página "Nossas Atividades"  ou "Eventos", o sistema pode precisar buscar dados de uma tabela de `Postagens` e de uma tabela de `Usuarios` (para saber quem foi o autor).

A `VIEW` criada neste projeto, `vw_RelatorioDeAtividades`, tem como objetivo simplificar essa consulta, encapsulando a lógica de `JOIN` e fornecendo uma "tabela virtual" limpa para o back-end consumir.

## 🛠️ Esquema do Banco de Dados (Exemplo)

Para criar a `VIEW`, consideramos o seguinte esquema simplificado, baseado nos requisitos do projeto:

1.  **`Usuarios`** (Para a área administrativa )
    * `id` (INT, Primary Key)
    * `nome` (VARCHAR)
    * `email` (VARCHAR)

2.  **`Atividades`** (Para a página "Nossas Atividades" )
    * `id` (INT, Primary Key)
    * `titulo` (VARCHAR)
    * `descricao` (TEXT)
    * `data_publicacao` (DATE)
    * `autor_id` (INT, Foreign Key -> `Usuarios.id`)

3.  **`Eventos`** (Para a página "Eventos" )
    * `id` (INT, Primary Key)
    * `nome_evento` (VARCHAR)
    * `data_evento` (DATETIME)
    * `local` (VARCHAR)

## 🖥️ Definição e Criação da VIEW

### A Solução: `CREATE VIEW`

Criamos a `VIEW` chamada `vw_RelatorioDeAtividades` para encapsular toda essa lógica.

**Código de Criação da View:**

```sql
CREATE VIEW vw_RelatorioDeAtividades AS
SELECT
    at.id AS AtividadeID,
    at.titulo AS TituloAtividade,
    at.descricao AS Descricao,
    at.data_publicacao AS DataPublicacao,
    us.nome AS NomeAutor,
    us.email AS EmailAutor
FROM
    Atividades AS at
JOIN
    Usuarios AS us ON at.autor_id = us.id;

```sql
-- Consulta simples usando a VIEW para buscar as 10 atividades mais recentes
SELECT
    TituloAtividade,
    Descricao,
    NomeAutor
FROM
    vw_RelatorioDeAtividades
ORDER BY
    DataPublicacao DESC
LIMIT 10;
```

## ✅ Conclusão

A `VIEW` abstrai a complexidade do esquema do banco de dados, facilita a manutenção do código (se as tabelas mudarem, apenas a `VIEW` precisa ser atualizada) e melhora a segurança, permitindo que o back-end acesse apenas os dados consolidados, e não as tabelas-base diretamente.