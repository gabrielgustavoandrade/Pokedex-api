export type Pokemon = {
    id?: number
    name: string
    pokedexnumber: number
    generation: number
    evolutionstag: number
    type1: number
    type2: number
    weather1: number
    weather2: number
    legendary: number
    aquireable: number
    spawns: number
    regional: number
    raidable: number
    hatchable: number
    shiny: number
    nest: number
    new: number
    notgettable: number
    futureevolve: number
    atk: number
    def: number
    sta: number
}

export type Weather = {
    id?: number,
    weather: string
}

export type Type = {
    id?: number,
    type: string
}

export type Return = {
    error?: any
    message: string
    status: number
    result?: any
  }