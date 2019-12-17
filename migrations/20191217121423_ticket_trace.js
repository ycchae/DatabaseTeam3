
exports.up = function(knex) {
    
    return knex.raw(`
    create table ticket_trace
    (
        time         date,
        ticket_id    int,
        user_id      int,
        memo         varchar(20),
        primary key (time, ticket_id),
        foreign key (user_id) references "myuser"("user_id"),
        foreign key (ticket_id) references "ticket"("ticket_id")
    )`).then(()=> console.log('ticket_trace created'));
};

exports.down = function(knex) {
    return knex.schema.dropTable("ticket_trace")
    .then(()=> console.log('ticket_trace dropped'));
};
