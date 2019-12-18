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

router.post('/', function(req, res) {        
    var json_string_data = req.body.data;
	var data = JSON.parse(json_string_data);
	console.log(data);

	var count = 0;

	for(var i = 0; i < data.length; i++){
		conn('ticket').insert({
			ticket_user_id: req.body.id, 
			ticket_ts_id: req.query.ts_id,
			ticket_seat_number: data[i],
			ticket_date: conn.raw('CURRENT_TIMESTAMP') })
			.then(function(result){
				count++;
				console.log(count); 
			});
	}


	res.send({ redirect: '/seats?ts_id=' + req.query.ts_id });
});



module.exports = router;
