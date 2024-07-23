import axios from "axios";
import { ApiResponse, Film, Hero, HeroData, Starship } from "./types";
import { fetchInBatches } from "./utils/fetchInBatches";

export const STAR_WARS_API_BASE_URL = "https://sw-api.starnavi.io/";

const sendRequest = async <T>(url: string) => {
  try {
    const res = await axios.get(url);

    return res.data as T;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getHeroesListPages = (
  url: string = `${STAR_WARS_API_BASE_URL}people/`
) => {
  return sendRequest<ApiResponse>(url);
};

export const getHeroData = async (heroId: number) => {
  return sendRequest<Hero>(`${STAR_WARS_API_BASE_URL}people/${heroId}/`);
};

export const getFilmsData = async (filmId: number) => {
  return sendRequest<Film>(`${STAR_WARS_API_BASE_URL}films/${filmId}/`);
};

export const getStarshipsData = async (starshipId: number) => {
  return sendRequest<Starship>(
    `${STAR_WARS_API_BASE_URL}starships/${starshipId}/`
  );
};

export const getHeroDataDetails = async (heroId: number): Promise<HeroData> => {
  const heroData = await getHeroData(heroId);

  const films = await fetchInBatches(heroData.films, getFilmsData);
  const starships = await fetchInBatches(heroData.starships, getStarshipsData);

  return {
    hero: heroData,
    films,
    starships,
  };
};
