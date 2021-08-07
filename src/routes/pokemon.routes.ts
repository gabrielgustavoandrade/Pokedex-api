import { Router } from "express";
import { findAll, insertNew, findOne, updateOne, deleteOne } from "../controllers/pokemon.controller";

const router: Router = Router();

router.get('/findAll', findAll)
router.post('/insert', insertNew)

router.route("/:pokemonId").get(findOne).put(updateOne).delete(deleteOne);

export default router