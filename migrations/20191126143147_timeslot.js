exports.up = function(knex) {
    return knex.schema.createTable("timeslot", table => {
      table.increments("timeslot_id").primary();
      table.date("start_date");
      table.date("end_date");
      table.integer("screen_id").references("screen.screen_id");
      table.integer("movie_id").references("movie.movie_id");
    })
    .then(()=> console.log('timeslot created'));
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("timeslot")
    .then(()=> console.log('timeslot created'));
  };
  