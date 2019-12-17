exports.up = function(knex) {
    return knex.schema.createTable("ticket", table => {
      table.increments("ticket_id").primary();
      table.integer("ticket_user_id").references("myuser.user_id");
      table.integer("ticket_ts_id").references("timeslot.timeslot_id");
      table.integer("ticket_seat_number");
      table.date("ticket_date");
    })
    .then(()=> console.log('ticket created'));
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("ticket")
    .then(()=> console.log('ticket dropped'));
  };