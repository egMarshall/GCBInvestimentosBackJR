### O CASE

    Foi proposto criar uma API no padrão REST de perfis médicos. Cada perfil deveria haver:
        - Nome do médico,
        - CRM do médico,
        - Telefone Fixo,
        - Telefone Celular,
        - CEP,
        - Especialidades.
        Todos os dados foram tratados para padronizar no banco.

    Foram criadas 3 tabelas, Uma para os médicos, uma para as especialidades previamente descritas e uma "bridge" para unir
    o médico com todas as especialidades desejadas.

    As especialidades podem ser inseridas com ou sem acentuação, espaços e letras maiúsculas ou minúsculas.

    Possui o script "migrations" para criar e popular as tabelas necessárias para o uso.


### DOCUMENTAÇÃO DO POSTMAN

https://documenter.getpostman.com/view/17588262/UVsFyUES


### TECNOLOGIAS

    O código foi escrito utilizando Typescript e NodeJS com KnexJS e seguindo POO. De serviços foram utilizados o uuid para gerar ID's aleatórias enquanto o banco é via mySQL.

### ENDPOINTS

[X]Criar um médico onde deve haver no mínimo duas especialidades;
    [X]Retornar ID do médico ao criá-lo.

    REGRAS:
    [X]Nome do médico com no máximo 120 caractéres;

    [X]CRM: somente números com no máximo 7 caracteres;

    [X]Telefone fixo: somente números;

    [X]Telefone celular: somente números;

    [ ]CEP: somente números (Ao cadastrar o CEP, deve ser feita uma reqisição via XHR para a API dos correios e retornar todos os dados de endereço do cliente);

    [X]Especialidade médica (mínimo de duas especialidades).

    Irá retornar a ID do médico para um melhor uso nos outros endpoints.


[X]Selecionar médico, voltando o médico com um array de suas especialiades:
    É necessário fornecer via params a ID do médico. Terá como retorno todos os dados daquele médico para poder ser manipulado.

[X]Atualizar médico:
    É necessário fornecer via params a ID do médico e pelo body quais serão as mudanças.

[X]Deletar médico:
    É necessário fornecer via params a ID do médico para que o mesmo seja deletado. Caso não haja médico com essa ID, será retornado o devido erro.# GCBInvestimentosBackJR
