
# helpteacher_web

Uma simples aplicação web para auxiliar a persistência das informações da atividade pratica supervisionada de desenvolvimento de aplicações móveis.


![panel](https://i.imgur.com/46RubXg.png)
  
![acting_area](https://i.imgur.com/rBJwRrg.png)


## Middlewares

  

### Listagem de professores

  

url: '/mobile/teachers'

metodo: get

parametros:

- page = Referente a paginação, deverá ser um número inteiro começando de 1. Cada incremento de paginação corresponderá a listagem de professores multiplicado por 10.

- prefer = (OPCIONAL) Usado para indicar a preferência de qual tipo de ordenação deseja. Por preço, nome de professor (ordem alfabetica) ou disciplina. Valores possíveis são 1 (Por preço), 2 (Por disciplina) ou 3 (Por nome de professor). Ao omitir será adotado o tipo por preço.

- sequence = Usado para indicar a disposição da listagem dos professores, seja por valor menos/maior ou ordem alfabética. Valores possíveis: "" (string vazia) = valor nulo, isto é, adota o comportamento padrão sendo ordenação por ascendencia; 1 (ou qualquer outro caractere diferente de 0) = adota a disposição por descendencia.

- query = Usado para indicar o campo de busca digitado pelo usuário.

retorno: um array de objetos

### Dados de professor

url: '/mobile/teachers/:id'

metodo: get

retorno: um JSON

Obs: :id deverá substituído pelo id do professor
  
  

### Dados de aluno

url: '/mobile/students/:id'

metodo: get

Obs: :id deverá substituído pelo id do aluno.

retorno: um JSON

### Autenticação

url: '/mobile/signIn'

metodo: post

retorno: um JSON

### Persistência de usuários
obs: válido para aluno e professor

url: '/mobile/user'

metodo: post

retorno: sem retorno de dados, apenas o sinal OK (204) para sucesso.


Dados a serem enviados para o backend deve ser consultado o diagrama ER do projeto. 

