exports.up = function(knex) {
    return knex.schema.createTable("screen", table => {
      table.increments("screen_id").primary();
      table.string("screen_name");
    }).then(()=> console.log('screen created'));
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("screen")
    .then(()=> console.log('screen dropped'));
  };