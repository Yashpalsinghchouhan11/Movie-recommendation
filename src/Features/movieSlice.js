import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  movies: null,
  movieIndex: null,
  movierecommendate:null,
  movieImage:null,
  loading:false
};

export const getMovies = () => {
  return new Promise((resolve, reject) => {
    fetch("/movie_data/movies.json")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const asyncGetMovies = createAsyncThunk(
  "movies/getMovies",
  async (_, thunkAPI) => {
    try {
      const response = await getMovies();
      if (response.ok) {
        const data = await response.json();
        thunkAPI.dispatch(setMovies(data));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const moviePoster = async (movieId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=dc25433c80efc6bb784d699ed6ee4573`);
    const data = await response.json();
    
    return data.poster_path;  // Return the poster path
  } catch (error) {
    console.log(error);
    return null;  // Return null in case of an error
  }
};

export const asyncRecommendation = createAsyncThunk(
    "recommendation",
    async (index, thunkAPI) => {
      try {
        // Fetch similarity data
        const response = await fetch('/movie_data/similarity.json');
        if (!response.ok) {
          throw new Error('Failed to load similarity data');
        }
  
        const similarityData = await response.json();
  
        // Fetch movies data from the state
        const state = thunkAPI.getState();
        const movies = state.movie.movies;
  
        if (!movies || !similarityData) {
          throw new Error('Movies or similarity data is missing');
        }
  
        // Get similarity scores for the selected movie index
        const distances = similarityData[index];
  
        // Create an array of { movieIndex, similarityScore } and sort by similarity score
        const movieList = distances
          .map((score, i) => ({ index: i, score }))
          .filter((item) => item.index !== index) // Exclude the selected movie itself
          .sort((a, b) => b.score - a.score) // Sort by highest score first
          .slice(1, 6); // Get the top 5 similar movies
  
        //   const posterPromises = movieList.map(async (item) => {
        //     const posterPath = await moviePoster(movies[item.index].id);
        //     return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
        //   });
        // const Posters = await Promise.all(posterPromises);
        const Posters = []
        for (let i=0; i<movieList.length; i++){
          const index = movieList[i].index
          const poster = await moviePoster(movies[index].id)
          const url = `https://image.tmdb.org/t/p/w500${poster}`
          Posters.push(url)
        }

        const recommendations = movieList.map(
          (item) => movies[item.index].title
        );
        
        // Dispatch the recommendations to the store
        thunkAPI.dispatch(setRecommendations(recommendations));
        thunkAPI.dispatch(setMovieImages(Posters.filter((url) => url !== null)));
        thunkAPI.dispatch(setLoading(false))
  
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    }
  );
  

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
      // console.log(state.movies);
    },
    setMovieIndex: (state, action) => {
      state.movieIndex = action.payload;
      // console.log(state.movies);
    },
    setRecommendations: (state, action) => {
      state.movierecommendate = action.payload;
      // console.log(state.movies);
    },
    setMovieImages: (state, action) => {
      state.movieImage = action.payload;
    },
    setLoading:(state,action)=>{
        state.loading = action.payload
    }
  },
});

export const movie = (state) => state.movie.movies;
export const loading = (state) => state.movie.loading;
export const movieIndex = (state) => state.movie.movieIndex;
export const movierecommendate = (state) => state.movie.movierecommendate;
export const movieImage = (state) => state.movie.movieImage;
export const { setMovies, setMovieIndex, setRecommendations, setLoading, setMovieImages } = movieSlice.actions;

export default movieSlice.reducer;
