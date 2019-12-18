var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const knex = require('knex');

var conn = knex({
	client: 'oracledb', 
	connection: {
		host: 'localhost', 
		user: 'musong', 
		password: 'musong',
		database: 'oraknu',
	}
});

//const { Tikcet } = require("../models/Ticket");

var booked = new Array();

router.get('/', function(req, res) {
	conn.select('ticket_seat_number')
      	.from('ticket')
      	.where('ticket_ts_id', req.query.ts_id)
      	.then(function(rows) { 
				booked = Object.keys(rows).map(function(k) { 
					return rows[k].ticket_seat_number;
				});
				
				sess = req.session;

				res.render('seats', { 
					pagetitle: 'Seats', 
					book: booked, 
					ts_id: req.query.ts_id,
					pagecss: 'seats.css',
					pagejs: 'seat.js',
					username: sess.username,
					user_id: sess.user_id
				});
			}
		);
});

router.post('/', function(req, res) {
	conn.select('ticket_seat_number')
      	.from('ticket')
      	.where('ticket_ts_id', req.body.ts_id)
      	.then(function(rows) { 
				booked = Object.keys(rows).map(function(k) { 
					return rows[k].ticket_seat_number;
				});
				
				sess = req.session;
				
				res.render('seats', { 
					pagetitle: 'Seats', 
					book: booked, 
					ts_id: req.body.ts_id,
					pagecss: 'seats.css',
					pagejs: 'seat.js',
					username: sess.username,
					user_id: sess.user_id
				});
			}
		);
});

module.exports = router;
