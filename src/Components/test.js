// const url = 'https://drive.google.com/drive/folders/1I6mj44_0sjjZ7N0ytXcTmwRiJUzqQ9hF?usp=sharing'
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//   };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));


const url = 'https://drive.google.com/drive/folders/1I6mj44_0sjjZ7N0ytXcTmwRiJUzqQ9hF?usp=sharing';
// const url = 'https://api.themoviedb.org/3/authentication';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    // Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI1NDMzYzgwZWZjNmJiNzg0ZDY5OWVkNmVlNDU3MyIsIm5iZiI6MTcyNDQ0NDU0NC42NzI1NjYsInN1YiI6IjY1YjJiMWYyYjFmNjhkMDE2M2Q1NGUwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B83SE6Aqp25RplN_zT_vJ9CTNzmxurI8fwLxQrCdqUk'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));

// const baseUrl = 'https://image.tmdb.org/t/p/w500'


// const url = `https://api.themoviedb.org/3/movie/7450?api_key=dc25433c80efc6bb784d699ed6ee4573`;
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzI1NDMzYzgwZWZjNmJiNzg0ZDY5OWVkNmVlNDU3MyIsIm5iZiI6MTcyNDQ0NDU0NC42NzI1NjYsInN1YiI6IjY1YjJiMWYyYjFmNjhkMDE2M2Q1NGUwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B83SE6Aqp25RplN_zT_vJ9CTNzmxurI8fwLxQrCdqUk'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));

