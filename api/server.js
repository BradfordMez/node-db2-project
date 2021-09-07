const express = require("express");

const carsRouter = require("./cars/cars-router");

const server = express();
server.use(express.json());

// DO YOUR MAGIC
server.use("/api/cars", carsRouter);

module.exports = server;
