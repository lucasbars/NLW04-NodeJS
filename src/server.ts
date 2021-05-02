import 'reflect-metadata';
import express, { request, response } from 'express';
import { router } from './routes';
import "./database";

const app = express();

app.use(express.json());
app.use(router);

// app.get("/", (request, response) => {
//   // return response.send("Hello World");
//   return response.json({message:"Hello World"});
// });

// app.post("/", (request, response) => {
//   return response.json({message: "dados foram salvos com sucesso"});
// });

app.listen(3333, ()=> console.log("Server is running"));