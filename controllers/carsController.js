const fs = require("fs");

const cars = JSON.parse(fs.readFileSync(`${__dirname}/../data/cars.json`));

const checkid = (req, res, next, val) => {
  const car = cars.find((el) => el.id === val);
  if (!car) {
    return res.status(400).json({
      status: "failed",
      message: `data with ${val} this not found`,
    });
  }

  next();
};

const getALLcars = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      requestTime: req.requestTime,
      cars,
    },
  });
};

const getCarsId = (req, res) => {
  const id = req.params.id;
  const car = cars.find((el) => el.id === id);

  res.status(200).json({
    status: "200",
    data: {
      car,
    },
  });
};

const newpostCar = (req, res) => {
  const newId = cars[cars.length - 1].id + 1;
  const newdata = Object.assign({ id: newId }, req.body);
  cars.push(newdata);
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(201).json({
      message: "201",
      data: {
        car: cars,
      },
    });
  });
};

const editDataCars = (req, res) => {
  const id = req.params.id;
  const index = cars.findIndex((el) => el.id === id);
  cars[index] = { ...cars[index], ...req.body };
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "200",
      message: `Data ${id} berhasil di edit`,
      data: {
        car: cars[index],
      },
    });
  });
};

const deleteCars = (req, res) => {
  const id = req.params.id;
  const index = cars.findIndex((el) => el.id === id);
  cars.splice(index, 1);
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "sucess",
      message: `Berhasil Dihapus`,
      data: null,
    });
  });
};

module.exports = {
  getALLcars,
  getCarsId,
  newpostCar,
  editDataCars,
  deleteCars,
  checkid,
};
