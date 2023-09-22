const express = require("express");
const carsRoterController = require("../controllers/carsController");
const router = express.Router();

router.param("id", carsRoterController.checkid);

router
  .route("/")
  .get(carsRoterController.getALLcars)
  .post(carsRoterController.newpostCar);

router
  .route("/:id")
  .get(carsRoterController.getCarsId)
  .patch(carsRoterController.editDataCars)
  .delete(carsRoterController.deleteCars);

module.exports = router;
