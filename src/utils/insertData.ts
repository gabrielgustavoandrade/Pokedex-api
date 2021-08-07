import excelToJson from "convert-excel-to-json";
import { insertPokemonFromJson, insertType, insertWeather } from "../Database";

export async function insertExcel() {
  //   let result = [];
  const result = excelToJson({
    sourceFile: "src/assets/Pokemon Go.xlsx",
    header: { rows: 1 },
    columnToKey: {
      B: "name",
      C: "pokedexnumber",
      E: "generation",
      F: "evolutionstag",
      G: "evolutionstag",
      J: "type1",
      K: "type2",
      L: "weather1",
      M: "weather2",
      R: "legendary",
      S: "aquireable",
      T: "spawns",
      U: "regional",
      V: "raidable",
      W: "hatchable",
      X: "shiny",
      Y: "nest",
      Z: "new",
      AA: "notgettable",
      AB: "futureevolve",
      O: "atk",
      P: "def",
      Q: "sta",
    },
  });

  let types: Array<any> = [];
  let weather: Array<any> = [];
  result.Sheet1.forEach((element) => {
    types.push(element.type1);
    types.push(element.type2);
    weather.push(element.weather1);
    weather.push(element.weather2);
  });

  let typesFiltered = removeDuplicate(types);
  let weatherFiltered = removeDuplicate(weather);

  weatherFiltered.forEach(async (element) => {
    await insertWeather({ weather: element });
  });

  typesFiltered.forEach(async (element) => {
    await insertType({ type: element });
  });

  result.Sheet1.forEach(async (element) => {
    await insertPokemonFromJson(element);
  });
}

function removeDuplicate(array: Array<any>) {
  let result: Array<any> = [];
  array.forEach((element) => {
    if (result.indexOf(element) < 0) {
      result.push(element);
    }
  });
  return result;
}
