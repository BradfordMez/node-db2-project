const express = require("express");
const Car = require("./cars-model");
const router = express.Router();
const {
  checkCarId,
  checkVinNumberValid,
  checkVinNumberUnique,
  checkCarPayload,
} = require("./cars-middleware");

// DO YOUR MAGIC

router.get("/", async (req, res, next) => {
  try {
    const all = await Car.getAll();
    res.json(all);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", checkCarId, (req, res) => {
  res.json(req.car);
});
router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await Car.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);
router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "Something failed, who knows?",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
