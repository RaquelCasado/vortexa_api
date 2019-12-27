const express =require("express");
const ramps = require("./ramps.js");

const router = express.Router();
router.use("/ramps", ramps);

module.exports = router;