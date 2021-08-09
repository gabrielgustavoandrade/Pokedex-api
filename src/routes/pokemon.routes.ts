import { Router } from "express";
import {
  findAll,
  findPaginate,
  insertNew,
  findOne,
  updateOne,
  deleteOne,
} from "../controllers/pokemon.controller";

const router: Router = Router();

router.get("/findAll", findAll);
router.get("/findPaginate/:page", findPaginate);
router.post("/insert", insertNew);

router.route("/:pokemonId").get(findOne).put(updateOne).delete(deleteOne);

export default router;
