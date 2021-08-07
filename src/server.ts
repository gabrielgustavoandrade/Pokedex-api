import express from 'express'
import { insertExcel } from "./utils/insertData";
import pokemonRoutes from './routes/pokemon.routes'

const app: express.Application = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(helmet())

app.use('/pokemon', pokemonRoutes)

app.listen(8080, async () => {
  console.log(`servidor rodando em http://localhost:8080`);
  // await insertExcel();
});
