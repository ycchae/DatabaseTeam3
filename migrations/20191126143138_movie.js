
exports.up = function(knex) {
    return knex.schema.createTable('movie', table => {
        table.increments('movie_id').primary();
        table.string('movie_title', 50);
        table.string('movie_genre');
        table.float('movie_rating');
        table.integer('movie_runtime');
        table.string('movie_director', 100);
        table.string('movie_actors', 500);
        table.string('movie_plot', 1000);
        table.boolean('movie_isAdult');
        table.string('movie_posterURL', 255);
    })
    .then(()=> console.log('movie created'))
    .catch((err)=> {console.log(err); throw err;})
};

exports.down = function(knex) {
  return knex.schema.dropTable('movie')
  .then(()=> console.log('movie dropped'));
};
