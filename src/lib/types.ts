export interface Hero {
  id: number;
  name: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
  homeworld?: number;
  films?: number[];
  species?: number[];
  vehicles?: number[];
  starships?: number[];
  url?: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Hero[];
}

export interface Film {
  id: number;
  title: string;
  episode_id?: number;
  opening_crawl?: string;
  director?: string;
  producer?: string;
  release_date?: string;
  characters?: number[];
  planets?: number[];
  starships?: number[];
  vehicles?: number[];
  species?: number[];
  created?: string;
  edited?: string;
  url?: string;
}

export interface Starship {
  id: number;
  name: string;
  model?: string;
  manufacturer?: string;
  cost_in_credits?: string;
  length?: string;
  max_atmosphering_speed?: string;
  crew?: string;
  passengers?: string;
  cargo_capacity?: string;
  consumables?: string;
  hyperdrive_rating?: string;
  MGLT?: string;
  starship_class?: string;
  pilots?: number[];
  films?: number[];
  created?: string;
  edited?: string;
  url?: string;
}

export interface HeroData {
  hero: Hero;
  films: Film[];
  starships: Starship[];
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  type: string;
}

export interface Species {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: number;
  language: string;
  name: string;
  people: number[];
  films: number[];
  skin_colors: string;
  url: string;
}
