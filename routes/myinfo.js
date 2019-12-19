const express = require("express");

const { TicketTrace } = require("../models/TicketTrace");
const { User } = require("../models/User");
const { raw } = require("objection");

const router = express.Router();

router.get("/", async (req, res) => {
  sess = req.session;

  const user = await User.query()
    .where("user_email", "=", sess.username)
    .first(); //TODO
  //   const tickets = await Ticket.query()
  //     .where("ticket_user_id", "=", 1) //TODO
  //     .eager("[timeslot]");
  console.log(
    TicketTrace.query()
      .where("USER_ID", "=", user["user_id"]) //TODO
      .select(
        "TIME",
        "MEMO",
        "ticket_seat_number",
        "movie_title",
        "start_date",
        "end_date"
      )
      .joinRelated("ticket")
      .joinRelated("ticket.movietimeslot")
      .toKnexQuery()
      .toSQL()
      .toNative()
  );

  const tickets5 = await TicketTrace.query()
    .where("USER_ID", "=", user["user_id"]) //TODO
    .select(
      "TIME",
      "MEMO",
      "ticket_seat_number",
      "movie_title",
      "start_date",
      "end_date"
    )
    .joinRelated("ticket")
    .joinRelated("ticket.movietimeslot");

  console.log(user);
  console.log(tickets5);

  res.render("myinfo", {
    pagetitle: "My Info",
    pagecss: "myinfo.css",
    // pagejs: 'myinfo.js',
    tickets: tickets5,
    user: user,
    username: sess.username
  });
});

module.exports = router;
