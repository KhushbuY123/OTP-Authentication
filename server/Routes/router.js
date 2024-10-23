const express = require('express');
const router = new express.Router();
const controllers = require("../controllers/userController");

// Routes
router.post("/user/register",controllers.userregisteration);
router.post("/user/sendotp",controllers.userOtpSend);
router.post("/user/verify",controllers.userverify);
router.post("/actor/verify",controllers.actorverify);
router.get("/user/getall",controllers.getallusers);

module.exports = router;
