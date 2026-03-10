export interface ApiInfo {
  count: number;
  totalPages: number;
  previousPage: string | null;
  nextPage: string | null;
}

export interface DisneyCharacter {
  _id: number;
  name: string;
  imageUrl: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  videoGames: string[];
  sourceUrl: string;
}

// Structure générique adaptée à la Disney API
export interface ApiResponse<T> {
  info: ApiInfo;
  data: T[]; // L'API Disney renvoie "data" et non "results"
}
