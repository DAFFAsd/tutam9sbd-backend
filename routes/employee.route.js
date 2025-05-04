const express = require("express");
const employeeController = require("../controllers/employee.controller");
const router = express.Router();

router.post("/add", employeeController.addEmployee);
router.post("/get", employeeController.getEmployee);
router.get('/:id', employeeController.getOneEmployee);
router.delete('/:id', employeeController.deleteEmployee); 
router.put('/:id', employeeController.updateEmployee);


module.exports = router;
