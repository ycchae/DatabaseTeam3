var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const knex = require('knex');

var conn = knex({
	client: 'oracledb', 
	connection: {
		host: 'db-team-project.crdklj6af2vt.ap-northeast-2.rds.amazonaws.com', 
		user: 'admin', 
		password: 'DBLab012345',
		database: 'oraknu',
	}
});

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
