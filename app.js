const fs = require("fs");
const express = require("express");
const app = express();
const port = process.env.port || 8080;
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());

// Data koleksi mobil
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});
const cars = JSON.parse(fs.readFileSync(`${__dirname}/data/cars.json`));

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
  if (!car) {
    return res.status(404).json({
      status: "failed",
      message: "Data Not found",
    });
  }
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
  if (index === -1) {
    return res.status(404).json({
      status: "Failed",
      message: `Data With ${id} not found`,
    });
  }
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
  if (index === -1) {
    return res.status(404).json({
      status: "Failed",
      message: `Data ${id} not found`,
    });
  }
  cars.splice(index, 1);
  fs.writeFile(`${__dirname}/data/cars.json`, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "sucess",
      message: `Berhasil Dihapus`,
      data: null,
    });
  });
};

//Membuka root
app.get("/api/v1/", (req, res) => {
  res.status(200).json({
    message: "ping successfully",
  });
});

const carsRouter = express.Router();

carsRouter.route("/").get(getALLcars).post(newpostCar);

carsRouter.route("/:id").get(getCarsId).patch(editDataCars).delete(deleteCars);

app.use("/api/v1/cars", carsRouter);

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
