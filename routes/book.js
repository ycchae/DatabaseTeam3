const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// ORACLE
const totalScreenNum = 5;

async function run(str) {

  if (str == 'NONE') return false;

  let connection;
  let result;

  try {
    connection = await oracledb.getConnection(  {
      user          : "musong",
      password      : "musong",
      connectString : "localhost/oraknu"
    })
    
    result = await connection.execute(str)
    //console.log(result.rows)
  } catch (err) {
    console.error(err)
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (err) {
        console.error(err)
      }
    }
  }
  return result.rows
}

// integrity check

function dateInput(str) { // str = YYYY-MM-DD
  if (!str) return false // null check
  let raw = str.split('-') // split to 1
  if (raw.length != 3) return false // see if format is XX-XX-XX
  if (isNaN(raw[0]) || isNaN(raw[1]) || isNaN(raw[2])) return false // see if all is number
  let obj = new Date(str)
  if (isNaN(obj.getTime())) return false
  if (0 > obj.getTime() || obj > new Date('2050-01-01')) return false
  // console.log("DATE OBJ", obj.getTime())
  return obj
}

function dateOutput(obj) { // Date
  if (!obj) return null;
  return obj.getUTCFullYear() + '-' + obj.getUTCMonth() + '-' + obj.getUTCDate()
}

function dateNextOutput(obj) { // Date
  if (!obj) return null;
  return obj.getUTCFullYear() + '-' + (obj.getUTCMonth() + 1) + '-' + obj.getUTCDate()
}

function dateGetTime(obj) {
  if (!obj) return null;
  return obj.getUTCHours() + ':' + obj.getUTCMinutes()
}

// get table
function makeMovieBlock(timeslot) {
  return `<form action="/seats" method="post">
  <div>
    <input type="hidden" value=${timeslot.TS_ID} name="ts_id">
    <input type="image" class="img-thumbnail" style="float: left; name="submit" src="http://image.tmdb.org/t/p/w92/${timeslot.MOVIE_POSTERURL}" width="50em" height="60em" border="0" alt="Submit">
    <p>${timeslot.MOVIE_TITLE} ${(timeslot.MOVIE_ISADULT == 'Y' ? " (성인)" : "")}</p>
  </div>
  <div style="clear: left;">
    <p style="display: inline;"><small>${timeslot.REMAINING_SEAT} / 50</small></p><br/>
    <p style="display: inline;"><small>${dateGetTime(timeslot.START_DATE)} ~ ${dateGetTime(timeslot.END_DATE)}</small></p>
  </div></form>`
}


function formTable(timeslots) {
  let body = ''
  let res = []
  let i
  timeslots.forEach(element => { // sort timeslots into object
    let screenNum = element.SCREEN_ID
    let found = false;
    for (i = 0; i < res.length; i++) {
      if (!(res[i][screenNum])) {
        found = true
        break
      }
    }
    if (!found) res.push({})
    res[i][screenNum] = element
  })

  res.forEach(element => { // convert object into HTML string
    body += '<tr>'
    for (i = 1; i <= totalScreenNum; i++) {
      body += '<td>'
      if (element[i]) body += makeMovieBlock(element[i]);
      body += '</td>'
    }
    body += '</tr>'
  })
  return `<table class="table">
  <thead>
    <tr>
      <th scope="col">긍지관</th>
      <th scope="col">2관</th>
      <th scope="col">3관</th>
      <th scope="col">월매관</th>
      <th scope="col">춘향관</th>
    </tr>
  </thead>
  <tbody>` + body + `</tbody></table>`
}

// HEAD

router.all('/', function (req, res) {
  let dateRaw
  // console.log("REQ.BODY", req.body);
  if (req.body) dateRaw = req.body.date
  let table = dateRaw ? `` : `<table class="table">
      <tr>
        <th scope="col">긍지관</th>
        <th scope="col">2관</th>
        <th scope="col">3관</th>
        <th scope="col">월매관</th>
        <th scope="col">춘향관</th>
      </tr>
  </table>`
    let date = dateInput(dateRaw)
    //console.log("DATE", date);
    run(
      date ? `
      SELECT screen."screen_id" as screen_id, 
             screen."screen_name" as screen_name, 
             ts."timeslot_id" as ts_id, 
             ts."start_date" as start_date, 
             ts."end_date" as end_date, 
             movie."movie_title" movie_title, 
             movie."movie_isAdult" movie_isAdult, 
             movie."movie_posterURL" as movie_posterURL,
             func_remainseats(ts."timeslot_id") as remaining_seat
      FROM "timeslot" ts, "movie" movie, "screen" screen 
      WHERE ts."screen_id"=screen."screen_id" AND 
            ts."movie_id"=movie."movie_id" AND 
            ts."start_date" BETWEEN TO_DATE('${dateOutput(date)}', 'YYYY-MM-DD') AND 
                                     TO_DATE('${dateNextOutput(date)}', 'YYYY-MM-DD')
      ORDER BY ts."start_date"` : `NONE`).then(function (timeslots) { 
        //console.log("TIMESLOTS", timeslots);
        if (timeslots) table = formTable(timeslots);
        sess = req.session;
        if(typeof sess.username === "undefined")
          sess.username = null;
        
        res.render('book', {
          pagetitle: 'CineKNU - KNU Cinema Site Mockup',
          username: sess.username,
          booking: table })
    }).catch(console.error)
  })


module.exports = router;
