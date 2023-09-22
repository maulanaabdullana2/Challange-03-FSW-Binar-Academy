const express = require("express");
const app = express();

const morgan = require("morgan");
const carsRouter = require("./routes/carsRoutes");

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use("/api/v1/cars", carsRouter);

module.exports = app;
