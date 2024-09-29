import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetMovies, movie, setMovieIndex, asyncRecommendation,setLoading } from "../Features/movieSlice";

export default function Search() {
  const [data, setdata] = useState("");
  const [index, setindex] = useState(null);
  const dispatch = useDispatch();
  const selectMovies = useSelector(movie);
  
  const getMovieIndex = (e) =>{
      const index = e.target.value;
      setindex(index)
    }

    const handlesubmit = () => {
      dispatch(setMovieIndex(index))
      setdata("");
      dispatch(asyncRecommendation(index));
      dispatch(setLoading(true))
    };

  useEffect(() => {
    dispatch(asyncGetMovies());
  }, [dispatch]);


  return (
    <>
      <h1 className="text-center text-violet-600 text-3xl font-semibold mb-8">Movie Recommendation System</h1>
      <div className="flex justify-center items-center max-md:flex-col ">
        {/* Select box for movies */}
        <select
          name=""
          onChange={getMovieIndex}
          className="w-2/4  bg-zinc-700 text-slate-50 border-2 border-zinc-500 placeholder-slate-400 p-2 mr-4  max-md:mb-2 max-md:p-2 max-md:mr-0 max-md:w-full"
        ><option>Select movies</option>
          {selectMovies && selectMovies.length > 0 ? (
            selectMovies.map((movie, index) => (
              <option value={index} key={index}>
                {movie.title}
              </option>
            ))
          ) : (
            <option>Loading movies...</option>
          )}
        </select>

        <button
          onClick={handlesubmit}
          className=" bg-zinc-700 text-slate-400 border-2 border-zinc-500 max-md:w-2/4"
        >
          Search
        </button>
      </div>
    </>
  );
}
