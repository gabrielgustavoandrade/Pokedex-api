import { Response } from "express";

export const findAll = async (res: Response): Promise<void> => {
  res.status(404).send({ message: "teste", error: "", result: "" });
};

export const insertNew = async (pokemon: any, res: Response): Promise<void> => {
  res.status(404).send({ message: "teste", error: "", result: "" });
};

export const findOne = async (pokemonId: any, res: Response): Promise<void> => {
  res.status(404).send({ message: "teste", error: "", result: "" });
};

export const updateOne = async (pokemonId: any, res: Response): Promise<void> => {
  res.status(404).send({ message: "teste", error: "", result: "" });
};

export const deleteOne = async (pokemonId: any, res: Response): Promise<void> => {
  res.status(404).send({ message: "teste", error: "", result: "" });
};
