import express, { request, response } from 'express';

const app = express();

app.get("/", (request, response) => {
  // return response.send("Hello World");
  return response.json({message:"Hello World"});
});

app.post("/", (request, response) => {
  return response.json({message: "dados foram salvos com sucesso"});
});

app.listen(3333, ()=> console.log("Server is running"));