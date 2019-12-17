
exports.up = function(knex) {
    return knex.raw(`
    create or replace function func_remainseats(p_ts_id in number) return number
    is v_count number;
    begin
        select count("ticket_id") into v_count from "ticket"
        where "ticket_ts_id" = p_ts_id
        group by "ticket_ts_id";

        return 50 - v_count;
    end;
    `)
    .then(()=> console.log('func_remainseats created'));
};

exports.down = function(knex) {
    return knex.raw('drop function func_remainseats')
    .then(()=> console.log('func_remainseats dropped'));
};
