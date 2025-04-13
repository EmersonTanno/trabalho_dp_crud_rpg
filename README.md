# Tecnologias Utilizadas 
- NestJS 

- Mongoose

- MongoDB

# Instalação e Execução do Projeto

- npm install
- npm run start:dev

# Documentação via Postman
A documentação completa dos endpoints da API está disponível na coleção do Postman abaixo. Nela é possível testar todas as rotas implementadas, com exemplos de requisições e respostas. <br><br>
[Documentação da API](https://github.com/user-attachments/files/19722206/RPG.postman_collection.json)<br><br>


Endpoints contemplados:
- Cadastrar Personagem `POST /personagem`

- Cadastrar Item Mágico `POST /item-magico`

- Listar Personagens `GET /personagem`

- Buscar Personagem por Identificador `GET /personagem/:id`

- Atualizar Nome Aventureiro por Identificador `PUT /personagem/newAdventurerName/:id`

- Remover Personagem `DELETE /personagem/:id`
  
- Listar Itens Mágicos `GET /item-magico`

- Buscar Item Mágico por Identificador `GET /item-magico/:id`

- Adicionar Item Mágico ao Personagem `PUT /personagem/addItem/:id`

- Listar Itens Mágicos por Personagem `GET /personagem/characterItens/:id`

- Remover Item Mágico do Personagem `PUT /personagem/removeItem/:id`

- Buscar Amuleto do Personagem `GET /personagem/amuleto/:id`
