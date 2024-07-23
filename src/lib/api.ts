import axios from "axios";
import { ApiResponse, Film, Hero, HeroData, Species, Starship } from "./types";
import { fetchInBatches } from "./utils/fetchInBatches";

// Base URL for the Star Wars API
export const STAR_WARS_API_BASE_URL = "https://sw-api.starnavi.io/";

/**
 * Sends a GET request to the provided URL and returns the response data.
 * @param url - The URL to send the request to.
 * @returns The response data typed as T.
 */
const sendRequest = async <T>(url: string): Promise<T> => {
  try {
    // Make the GET request using axios
    const res = await axios.get(url);
    // Return the data from the response, typed as T
    return res.data as T;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

/**
 * Retrieves a list of heroes from the API.
 * @param url - The URL to fetch the list of heroes from (default is the API's people endpoint).
 * @returns A promise that resolves to the API response containing the list of heroes.
 */
export const getHeroesListPages = (
  url: string = `${STAR_WARS_API_BASE_URL}people/`
): Promise<ApiResponse> => {
  return sendRequest<ApiResponse>(url);
};

/**
 * Retrieves data for a specific hero by their ID.
 * @param heroId - The ID of the hero to fetch.
 * @returns A promise that resolves to the hero's data.
 */
export const getHeroData = async (heroId: number): Promise<Hero> => {
  return sendRequest<Hero>(`${STAR_WARS_API_BASE_URL}people/${heroId}/`);
};

/**
 * Retrieves data for a specific film by its ID.
 * @param filmId - The ID of the film to fetch.
 * @returns A promise that resolves to the film's data.
 */
export const getFilmsData = async (filmId: number): Promise<Film> => {
  return sendRequest<Film>(`${STAR_WARS_API_BASE_URL}films/${filmId}/`);
};

/**
 * Retrieves data for a specific species by its ID.
 * @param speciesId - The ID of the species to fetch.
 * @returns A promise that resolves to the species' data.
 */
export const getSpeciesData = async (speciesId: number): Promise<Species> => {
  return sendRequest<Species>(`${STAR_WARS_API_BASE_URL}species/${speciesId}/`);
};

/**
 * Retrieves data for a specific starship by its ID.
 * @param starshipId - The ID of the starship to fetch.
 * @returns A promise that resolves to the starship's data.
 */
export const getStarshipsData = async (
  starshipId: number
): Promise<Starship> => {
  return sendRequest<Starship>(
    `${STAR_WARS_API_BASE_URL}starships/${starshipId}/`
  );
};

/**
 * Retrieves detailed information for a specific hero, including their films and starships.
 * @param heroId - The ID of the hero to fetch detailed data for.
 * @returns A promise that resolves to an object containing the hero's data, films, and starships.
 */
export const getHeroDataDetails = async (heroId: number): Promise<HeroData> => {
  // Fetch the hero's basic data
  const heroData = await getHeroData(heroId);

  // Fetch the films and starships data in batches using the fetchInBatches utility
  const films = await fetchInBatches(heroData.films || [], getFilmsData);
  const starships = await fetchInBatches(
    heroData.starships || [],
    getStarshipsData
  );

  // Return an object containing the hero's data, films, and starships
  return {
    hero: heroData,
    films,
    starships,
  };
};
