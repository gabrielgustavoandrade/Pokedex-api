import { Pool } from "pg";
import * as httpStatus from "http-status";
import { Pokemon, Return, Type, Weather } from "../utils/types";

const pool = new Pool({
  connectionString:
    "postgres://ucwwjpwnexkkly:03046dde4be5881f43f14721899122f31c2040ded7ca348eff6ad975f210adc6@ec2-54-164-22-242.compute-1.amazonaws.com:5432/dflofsvq96m4al",
  ssl: {
    requestCert: true,
    rejectUnauthorized: false,
  },
});

export async function findAll() {
  const res = await pool.query("SELECT * FROM pokemon");
  return res.rows;
}

export async function insertWeather(weather: Weather) {
  const sql = "INSERT INTO weather(weather) VALUES ($1);";
  const values = [weather.weather];
  return await pool.query(sql, values);
}

export async function insertType(type: Type) {
  const sql = "INSERT INTO type(type) VALUES ($1);";
  const values = [type.type];
  return await pool.query(sql, values);
}

export async function insertPokemonFromJson(pokemon: Pokemon) {
  const type1 = pokemon.type1 ? await getType(pokemon.type1.toString()) : null;
  const type2 = pokemon.type2 ? await getType(pokemon.type2.toString()) : null;
  const weather1 = pokemon.weather1
    ? await getWeather(pokemon.weather1.toString())
    : null;
  const weather2 = pokemon.weather2
    ? await getWeather(pokemon.weather2.toString())
    : null;
  const sql = `INSERT INTO pokemon (name, pokedexnumber, generation, evolutionstag, type1, type2, weather1, weather2, created_on, legendary, aquireable, spawns, regional, raidable, hatchable, shiny, nest, new, notgettable, futureevolve, def, atk, sta) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)`;
  const values = [
    pokemon.name,
    pokemon.pokedexnumber,
    pokemon.generation,
    pokemon.evolutionstag,
    type1,
    type2,
    weather1,
    weather2,
    new Date(),
    pokemon.legendary,
    pokemon.aquireable,
    pokemon.spawns,
    pokemon.regional,
    pokemon.raidable,
    pokemon.hatchable,
    pokemon.shiny,
    pokemon.nest,
    pokemon.new,
    pokemon.notgettable,
    pokemon.futureevolve,
    pokemon.def,
    pokemon.atk,
    pokemon.sta,
  ];
  return await pool.query(sql, values);
}

export const getType = async (type: string) => {
  const sql = `SELECT *  FROM type WHERE type like '${type}'`;
  const res = await pool.query(sql);
  return res.rows[0].id;
};

export const getWeather = async (weather: string) => {
  const sql = `SELECT *  FROM  weather WHERE weather = '${weather}'`;
  const res = await pool.query(sql);
  return res.rows[0].id;
};

export const getPokemons = async (): Promise<Return> => {
  try {
    const sql = `SELECT * FROM pokemon`;
    const res = await pool.query(sql);
    return {
      message: "Pokemons buscado com sucesso!",
      status: httpStatus.OK,
      result: res.rows,
    };
  } catch (error) {
    return {
      error,
      message: "erro ao buscar os pokemons",
      status: httpStatus.INTERNAL_SERVER_ERROR,
    };
  }
};

export const getPokemonsPaginate = async (page: string): Promise<Return> => {
  try {
    const sql = `
    select
     p.id, p.name, t.type as type1, t2.type as type2, w.weather as weather1, w2.weather as weather2, p.def, p.atk, p.sta
    from
      pokemon p
        inner join type t ON t.id = p.type1 
        inner join type t2 ON t2.id = p.type2
        inner join weather w ON w.id = p.weather1 
        inner join weather w2 ON w2.id = p.weather2 
        order by
      p.id
      limit 9 offset ${page}0;`;
    const res = await pool.query(sql);
    return {
      message: "Pokemons buscado com sucesso!",
      status: httpStatus.OK,
      result: res.rows,
    };
  } catch (error) {
    return {
      error,
      message: "erro ao buscar os pokemons",
      status: httpStatus.INTERNAL_SERVER_ERROR,
    };
  }
};

export const getPokemon = async (id: number): Promise<Return> => {
  try {
    const sql = `SELECT * FROM pokemon WHERE id = ${id}`;
    const res = await pool.query(sql);
    return {
      message: "Pokemon buscado com sucesso!",
      status: httpStatus.OK,
      result: res.rows[0],
    };
  } catch (error) {
    return {
      error,
      message: "erro ao buscar os pokemon",
      status: httpStatus.INTERNAL_SERVER_ERROR,
    };
  }
};

export const insertPokemon = async (pokemon: Pokemon): Promise<Return> => {
  try {
    const sql = `INSERT INTO pokemon (name, pokedexnumber, generation, evolutionstag, type1, type2, weather1, weather2, created_on, legendary, aquireable, spawns, regional, raidable, hatchable, shiny, nest, new, notgettable, futureevolve, def, atk, sta) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)`;
    const values = [
      pokemon.name,
      pokemon.pokedexnumber,
      pokemon.generation,
      pokemon.evolutionstag,
      pokemon.type1,
      pokemon.type2,
      pokemon.weather1,
      pokemon.weather2,
      new Date(),
      pokemon.legendary,
      pokemon.aquireable,
      pokemon.spawns,
      pokemon.regional,
      pokemon.raidable,
      pokemon.hatchable,
      pokemon.shiny,
      pokemon.nest,
      pokemon.new,
      pokemon.notgettable,
      pokemon.futureevolve,
      pokemon.def,
      pokemon.atk,
      pokemon.sta,
    ];
    const result = pool.query(sql, values);
    return {
      message: "Pokemon inserido com sucesso!",
      status: httpStatus.OK,
      result,
    };
  } catch (error) {
    return {
      error,
      message: "erro ao buscar os pokemons",
      status: httpStatus.INTERNAL_SERVER_ERROR,
    };
  }
};

export const updatePokemon = async (pokemon: Pokemon): Promise<Return> => {
  try {
    const sql = `UPDATE pokemon SET name = $1,pokedexnumber = $2,generation = $3,evolutionstag = $4, type1 = $5, type2 = $6, weather1 = $7, weather2 = $8, legendary = $9, aquireable = $10, spawns = $11,regional = $12,raidable = $13, hatchable = $14, shiny = $15, nest = $16, new = $17, notgettable = $18,futureevolve = $19, def = $20,atk = $21,sta = $22 WHERE id = $23`;
    const values = [
      pokemon.name,
      pokemon.pokedexnumber,
      pokemon.generation,
      pokemon.evolutionstag,
      pokemon.type1,
      pokemon.type2,
      pokemon.weather1,
      pokemon.weather2,
      pokemon.legendary,
      pokemon.aquireable,
      pokemon.spawns,
      pokemon.regional,
      pokemon.raidable,
      pokemon.hatchable,
      pokemon.shiny,
      pokemon.nest,
      pokemon.new,
      pokemon.notgettable,
      pokemon.futureevolve,
      pokemon.def,
      pokemon.atk,
      pokemon.sta,
      pokemon.id,
    ];
    const result = pool.query(sql, values);
    return {
      message: "Pokemon atualizado com sucesso!",
      status: httpStatus.OK,
      result,
    };
  } catch (error) {
    return {
      error,
      message: "erro ao atualizar o pokemon",
      status: httpStatus.INTERNAL_SERVER_ERROR,
    };
  }
};

export const deletePokemon = async (pokemonId: number): Promise<Return> => {
  try {
    const sql = `UPDATE pokemon SET inactive = true WHERE id = $1`;
    const values = [pokemonId];
    pool.query(sql, values);
    return {
      message: "Pokemon deletado com sucesso!",
      status: httpStatus.OK,
    };
  } catch (error) {
    return {
      error,
      message: "erro ao deletar o pokemon",
      status: httpStatus.INTERNAL_SERVER_ERROR,
    };
  }
};
