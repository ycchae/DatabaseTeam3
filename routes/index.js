var express = require('express');
var router = express.Router();

const { Movie } = require("../models/Movie");

/* GET home page. */
router.get('/',  async (req, res) => {
  sess = req.session;
  sess.username = "yunchang";
  movies = await Movie.query();
  console.log(movies);
  res.render('index', {
     pagetitle: 'DBLOVE CINEMA',
     pagecss: 'movieinfo.css',
     pagejs: 'movieinfo.js',
     username: sess.username,
     movieDetails: movies
    });
});

// router.post('/create_movie', function(req, res, next){
//   console.log("create movie");
//   // db_reset.createmovie();
//   // res.writeHead(200, { 'Content-Type': 'application/json' })
//   // var admit = {"status" : "success"};
//   // res.write(admit);
//   // res.end();
// });
// router.post('/insert_movies', function(req, res, next){
//   console.log("insert movie");
//   // db_reset.insertMovies();
// });


module.exports = router;
