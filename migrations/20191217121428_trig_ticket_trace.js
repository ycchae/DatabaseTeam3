
exports.up = function(knex) {
  return knex.raw(`
    create or replace trigger trig_ticket_trace
      after insert or update or delete on "ticket"
      for each row
    begin
      if inserting then
        insert into ticket_trace(time, ticket_id, user_id, memo)
        VALUES (sysdate, :new."ticket_id", :new."user_id", '예약');
      elsif updating then
        insert into ticket_trace(time, ticket_id, user_id, memo)
        VALUES (sysdate, :old."ticket_id", :old."user_id", '변경');
      elsif deleting then
        insert into ticket_trace(time, ticket_id, user_id, memo)
        VALUES (sysdate, :old."ticket_id", :old."user_id", '취소');
      end if;
    end;
  `).then(()=> console.log('trig_ticket_trace created'));
};

exports.down = function(knex) {
  return knex.raw('drop trigger trig_ticket_trace')
  .then(()=> console.log('trig_ticket_trace dropped'));
};


