const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Error handlers
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const internalServerError = require("./error-handlers/500");
const notfound = require("./error-handlers/404");

const authRoute = require("./routes/auth");
const itemRoutes = require("./routes/item");
const commentsRoutes = require("./routes/comments");

const app = express();

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '100mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))
app.use(expressValidator());
app.use(cors());

app.use(bodyParser.json());

// routes
app.use('/items',itemRoutes)
app.use('/comments',commentsRoutes)
app.use("/api/v1/users", authRoute);
app.use(internalServerError);
app.use("*", notfound);

module.exports = app;
