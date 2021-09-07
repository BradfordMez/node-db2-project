const Car = require("../cars/cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id);
    if (!car) {
      res
        .status(404)
        .json({ message: `car with id ${req.params.id} is not found` });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  if (!req.body.vin) {
    next({ status: 400, message: "vin is missing" });
  } 
  if (!req.body.make) {
    next({ status: 400, message: "make is missing" });
  } 
  if (!req.body.model) {
    next({ status: 400, message: "model is missing" });
  } 
  if (!req.body.mileage) {
    next({ status: 400, message: "mileage is missing" });
  }
  next();
};

const checkVinNumberValid = async (req, res, next) => {
  const isValidVin = await vinValidator.validate(req.body.vin);
  if (!isValidVin) {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` });
  }
  next();
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const exists = await Car.getByVin(req.body.vin);

    if (exists) {
      next({ status: 400, message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
