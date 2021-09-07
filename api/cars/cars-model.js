const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = async (id) => {
  const result = await db("cars").where("id", id).first();
  return result;
};

const getByVin = (vin) => {
  return db("cars").where("vin", vin).first();
};

const create = (car) => {
  return db("cars")
    .insert(car)
    .then(([id]) => {
      return getById(id);
    });
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
};
