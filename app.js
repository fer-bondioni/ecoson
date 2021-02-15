var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
const { secured } = require("./middlewares/auth");
dotenv.config();

var indexRouter = require("./routes/index");
const noticias = require("./routes/noticias");
const categorias = require("./routes/categorias");
const usuarios = require("./routes/users");
const auth = require("./routes/auth");
const perfil = require("./routes/perfil");
const registro = require("./routes/registro");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/noticias", noticias);
app.use("/categorias", categorias);
app.use("/auth", auth);
app.use("/registro", registro);
app.use("/users", usuarios);
app.use("/perfil", secured, perfil);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ message: "Página no encontrada" });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
