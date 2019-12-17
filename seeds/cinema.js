var fetch = require('node-fetch');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movie').del()
    .then(function () {
      return loadMoviesFromTmdb()
      .then((movies)=>{
        return knex('movie').insert(movies);
      })
    });
};

async function loadMoviesFromTmdb(){
  let key = "d4a6dd74e20df5bdc24048a2d7f114b7";
  let discover_url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&certification_country=US&api_key=${key}`;
  
  var res = await fetch(discover_url);
  let discover_res = await res.json();
  // console.log(discover_res);
  movies = Array();
  for(var i=0; i<20; ++i){
      let movie_id = discover_res["results"][i]["id"];
      let movie_title = discover_res["results"][i]["title"];
      // console.log(discover_res["results"][i]);

      let movie_detail_url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US&api_key=${key}`;
      var res = await fetch(movie_detail_url)
      let movie_detail_res = await res.json();
      // console.log(movie_detail_res);
      
      var movie_genres = movie_detail_res["genres"];
      let movie_genre = "";
      for(var j=0; j<movie_genres.length; ++j)
          movie_genre += movie_genres[j]["name"] +" ";
      let movie_rating = movie_detail_res["vote_average"];
      let movie_runtime = movie_detail_res["runtime"];
      let movie_plot = movie_detail_res["overview"];
      let movie_posterURL = movie_detail_res["poster_path"];
      let movie_isAdult = movie_detail_res["adult"];

      let credit_url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?&api_key=${key}`;
      var res = await fetch(credit_url)
      let credit_res = await res.json();
      let credit_crew = credit_res["crew"];
      let credit_cast = credit_res["cast"];
      let movie_director = "";        
      for(var j=0; j<credit_crew.length; ++j){
          if(credit_crew[j]["job"] == "Director"){
              movie_director = credit_crew[j]["name"];
              break;
          }
      }
      let movie_actors = "";
      var cnt = 0;
      for(var j=0; j<credit_cast.length; ++j){
          if(credit_cast[j]["name"] != null){
              movie_actors += credit_cast[j]["name"] +" ";
              ++cnt;
              if(cnt > 5) break;
          }
      }
      movies[i] = {
          movie_title: movie_title,
          movie_genre: movie_genre,
          movie_rating: movie_rating,
          movie_runtime: movie_runtime,
          movie_director: movie_director,
          movie_actors: movie_actors,
          movie_plot: movie_plot,
          movie_isAdult: movie_isAdult,
          movie_posterURL: movie_posterURL
      };
      console.log(movies[i]);
  }
  return movies;
}