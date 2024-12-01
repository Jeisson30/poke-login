import axios from 'axios';

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemonData = async (limit: number, offset: number) => {
  try {
    const response = await axios.get(POKE_API_URL, {
      params: {
        limit,
        offset,
      },
    });

    return response.data;
  } catch (error) {
    return { success: false, message: 'An error occurred with service' };
  }
};
