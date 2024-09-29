import {configureStore} from '@reduxjs/toolkit'
import  movieReducer  from '../Features/movieSlice';
const store = configureStore({
    reducer: {
      movie: movieReducer, // Register your movie reducer
    },
  });
  
  export default store;