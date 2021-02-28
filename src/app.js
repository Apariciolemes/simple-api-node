const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: v4(),
    title,
    url,
    techs,
    likes: 0,
  }
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex(item => item.id === id);

  if (index < 0) {
    return response.status(400).json({error: 'Erro ao atualizar repositorio'})
  }
  repositories[index].title = title;
  repositories[index].url = url;
  repositories[index].techs = techs;

  return response.json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(item => item.id === id);

  if (index < 0) {
    return response.status(400).json({error: 'Erro ao deletar repositorio'})
  }

  repositories.splice(index, 1)

  return response.status(204).json();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(item => item.id === id);

  if (index < 0) {
    return response.status(400).json({error: 'Erro ao dar like no repositorio'})
  }

  repositories[index].likes++;

  return response.json(repositories[index]);
});

module.exports = app;
