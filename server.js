"use strict";
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 5050;

const app = require("./src/app");

//db
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => {
    console.log(err);
    console.log(`DB connected successfully`);
  });

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
