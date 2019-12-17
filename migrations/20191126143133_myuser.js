
exports.up = function(knex) {
    return knex.schema.createTable("myuser", table => {
        table.increments("user_id").primary();
        table.string("user_email").unique();
        table.string("user_password");
        table.date("user_birthdate");
      }).then(()=> console.log('myuser created'));
};

exports.down = function(knex) {
    return knex.schema.dropTable("myuser")
    .then(()=> console.log('myuser dropped'));;
};
