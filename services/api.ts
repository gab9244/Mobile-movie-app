export const TMGB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

// fetchMovies é um hook customizado que recebe uma string, que no caso é o valor colocado na barra de pesquisa do app


export const fetchMovies = async ({ query }: { query: string }) => {
  // Primeiro criamos a variável endpoint que tem como valor colocado uma url customizada com o valor colocado na barra de pesquisa caso algum valor tenha sido inserido na barra de pesquisa, caso contrário terá como valor uma url que mostrará os filmes mais populares
  const endpoint = query
    ? `${TMGB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMGB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    // response é uma promise que envia uma solicitação para 
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMGB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies ${response.statusText}`);
  }

  const data = await response.json();

  return data.results;
};

export const fetchMoviesDetails = async (moviesId: string):Promise<MovieDetails> =>{
    try{
      const response = await fetch(`${TMGB_CONFIG.BASE_URL}/movie/${moviesId}?api_key=${TMGB_CONFIG.API_KEY}`, {
        method:"GET",
        headers: TMGB_CONFIG.headers
      })
      if(!response.ok) throw new Error ('Fail to fetch movie details')
        const data = await response.json();
      return data
    }catch(error) {
      console.log(error) 
      throw error
    }
 }
