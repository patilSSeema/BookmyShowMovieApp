const apikey = "82960b91d7c0093b13f06edbe790c230";
const apiDomain = "https://api.themoviedb.org/3/";

export const getNowPlayingMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${apiDomain}movie/now_playing?api_key=${apikey}&language=en-US}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};
export const getGenre = async () => {
  try {
    const res = await fetch(`${apiDomain}/genre/movie/list?api_key=${apikey}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
export const getImages = async (id) => {
  try {
    const response = await fetch(
      `${apiDomain}movie/${id}/images?api_key=${apikey}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return false;
  }
};
export const getMoviesWithGenreId = async (id, page = 1) => {
  try {
    const res = await fetch(
      `${apiDomain}movie/now_playing?api_key=${apikey}&with_genres=${id}&sort_by=popularity.desc&page=${page}`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
export const searchMovie = async (query) => {
  try {
    const res = await fetch(
      `${apiDomain}/search/movie?api_key=${apikey}&query=${query}`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
