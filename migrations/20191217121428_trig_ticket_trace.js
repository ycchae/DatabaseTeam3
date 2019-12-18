exports.up = function(knex) {
  return knex
    .raw(
      `
  create or replace trigger trig_ticket_trace
  after insert or update or delete on "ticket"
  for each row
  begin
    if INSERTING then
        insert into ticket_trace(time, ticket_id, USER_ID, memo)
        VALUES (sysdate, :new."ticket_id", :new."ticket_user_id", '예약');
    elsif UPDATING then
        insert into ticket_trace(time, ticket_id, USER_ID, memo)
        VALUES (sysdate, :old."ticket_id", :old."ticket_user_id", '변경');
    elsif DELETING then
        insert into ticket_trace(time, ticket_id, USER_ID, memo)
        VALUES (sysdate, :old."ticket_id", :old."ticket_user_id", '취소');
    end if;
  end;
  `
    )
    .then(() => console.log("trig_ticket_trace crewated"));
};

exports.down = function(knex) {
  return knex
    .raw("drop trigger trig_ticket_trace")
    .then(() => console.log("trig_ticket_trace dropped"));
};
