import { Response, Request } from "express";
import {
  deletePokemon,
  getPokemon,
  getPokemons,
  insertPokemon,
  updatePokemon,
} from "../Database";

export const findAll = async (req: Request, res: Response): Promise<void> => {
  const { message, error, result, status } = await getPokemons();
  res.status(status).send({ message: message, error: error, result: result });
};

export const insertNew = async (req: Request, res: Response): Promise<void> => {
  const { message, error, result, status } = await insertPokemon(req.body);
  res.status(status).send({ message: message, error: error, result: result });
};

export const findOne = async (req: Request, res: Response): Promise<void> => {
  const { message, error, result, status } = await getPokemon(
    Number(req.params.id)
  );
  res.status(status).send({ message: message, error: error, result: result });
};

export const updateOne = async (req: Request, res: Response): Promise<void> => {
  const { message, error, result, status } = await updatePokemon(req.body);
  res.status(status).send({ message: message, error: error, result: result });
};

export const deleteOne = async (req: Request, res: Response): Promise<void> => {
  const { message, error, result, status } = await deletePokemon(
    Number(req.params.id)
  );
  res.status(status).send({ message: message, error: error, result: result });
};
