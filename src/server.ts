import express from "express";

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(8080, async () => {
  console.log(`servidor rodando em http://localhost:8080`);
});
