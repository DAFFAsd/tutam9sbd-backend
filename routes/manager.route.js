const express = require("express");
const managerController = require("../controllers/manager.controller");
const router = express.Router();

router.post("/login", managerController.login);
router.post("/register", managerController.register); 
router.get("/profile", managerController.getProfile);
router.post("/update-password", managerController.updatePassword);


module.exports = router;
