import express from "express";
import cors from 'cors'
import { insertExcel } from "./utils/insertData";
import pokemonRoutes from "./routes/pokemon.routes";

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/pokemon", pokemonRoutes);

app.listen(process.env.PORT || 8080, async () => {
  console.log(`servidor rodando`);
  // await insertExcel();
});
