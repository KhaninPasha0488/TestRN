import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/';

const instance = axios.create({
  baseURL: BASE_URL,
});

export type TaskItemType = {
  id: number;
  title: string;
  description: string;
  is_done: boolean;
  is_important: boolean;
};
export type PokemonType = {
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
  getAllTasks(offset: number) {
    return instance.get<{results: TaskItemType[]}>(
      `/pokemon?limit=10&offset=${offset}`,
    );
  },

  refreshAllTasks() {
    return instance.get<{results: TaskItemType[]}>(
      '/pokemon?limit=10&offset=0',
    );
  },

  getCurrentPokemon(url: string) {
    return instance.get<PokemonType>(url.replace(BASE_URL, ''));
  },
};
