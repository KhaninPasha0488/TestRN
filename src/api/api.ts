import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/';

const instance = axios.create({
  baseURL: BASE_URL,
});

export type PokemonItem = {
  name: string;
  url: string;
};
export type PokemonT = {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
};

export const api = {
  getAllPokemon(offset: number) {
    return instance.get<{results: PokemonItem[]}>(
      `/pokemon?limit=10&offset=${offset}`,
    );
  },
  refreshAllPokemon() {
    return instance.get<{results: PokemonItem[]}>('/pokemon?limit=10&offset=0');
  },
  getCurrentPokemon(url: string) {
    return instance.get<PokemonT>(url.replace(BASE_URL, ''));
  },
};
