const { Router } = require("express");
const router = Router();


//Controller Students
const {getStudents} = require("../controller");
const {postStudents} = require("../controller");
const {putStudents} = require("../controller");
const {deleteStudents} = require("../controller");

//Controller Admin
const {record} = require("../controller/admin");
const {auth} = require("../controller/admin");

//Middlewares
const {jwtAuth} = require("../controller/admin")


//Controller Router
router.get("/",jwtAuth, getStudents );

router.post("/",jwtAuth, postStudents );

router.put("/",jwtAuth, putStudents );

router.delete("/", deleteStudents );

router.post("/record", record );

router.post("/auth", auth );


module.exports = router;