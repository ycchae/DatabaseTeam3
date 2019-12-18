var express = require('express');
var router = express.Router();

const { Movie } = require("../models/Movie");

/* GET home page. */
router.get('/',  async (req, res) => {
  sess = req.session;
  
  if(typeof sess.username === "undefined")
    sess.username = null;
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

router.get('/logout',  async (req, res) => {
  sess = req.session;
  
  sess.username = null;
  sess.user_id = null;
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

module.exports = router;
