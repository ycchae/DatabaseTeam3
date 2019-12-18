var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var signupRouter = require("./routes/signup");
var loginRouter = require("./routes/login");
var myinfoRouter = require("./routes/myinfo");
var seatsRouter = require("./routes/seats");
var resultRouter = require("./routes/result");
var bookRouter = require("./routes/book");

var session = require("express-session");

var app = express();

const knex = require("knex");
const connection_info = require("./knexfile");
const conn = knex(connection_info);
const { Model } = require("objection");

// console.log(
//   conn("TICKET_TRACE")
//     .select()
//     .toSQL()
//     .toNative()
// );
// conn("TICKET_TRACE").then(rows => console.log(rows));

Model.knex(conn);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// session
app.use(
  session({
    secret: "@#@$MYSIGN#@$#$",
    resave: false,
    saveUninitialized: true
  })
);

// module redirection
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

// router

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/myinfo", myinfoRouter);
app.use("/seats", seatsRouter);
app.use("/result", resultRouter);
app.use("/book", bookRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
