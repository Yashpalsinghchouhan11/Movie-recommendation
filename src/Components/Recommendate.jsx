import {useSelector } from "react-redux";
import {
  movierecommendate,
  loading,
  movieImage,
} from "../Features/movieSlice";
import fallbackimg from '../assets/altimage.png';

export default function Recommendate() {
  const Loading = useSelector(loading);
  const movieImages = useSelector(movieImage);
  const movieRecommendate = useSelector(movierecommendate);

  return (
    <>
      {Loading ? (
        <h1 className="text-4xl text-slate-50 flex justify-center items-center mt-16">
          Loading...
        </h1>
      ) : movieRecommendate && movieRecommendate.length > 0 ? (
        <main className="grid grid-cols-3 gap-8 max-md:grid-cols-1">
          {movieRecommendate.map((title, index) => (
            <div
              className="bg-zinc-800 flex flex-col justify-center items-center mt-8"
              key={index}
            >
              <div className="p-4">
                <img 
                  className="h-56 w-36" 
                  src={movieImages[index]} 
                  alt="movie poster" 
                  onError={(e) => { e.target.src = fallbackimg; }}
                />
              </div>
              <h1 className="text-slate-50 text-2xl mb-4">{title}</h1>
            </div>
          ))}
        </main>
      ) : (
        <h1 className="text-4xl text-slate-50 flex justify-center items-center mt-16">
          No Recommendations Found
        </h1>
      )}
    </>
  );
}
