const { authControllers, profileController, vacancyController, applyController } = require("../controller")
const { verifyToken, checkRole } = require("../middleware/auth")
const router = require("express").Router();


router.post("/register", authControllers.register);
router.post("/login", authControllers.login);

//admin
router.get("/users", verifyToken, checkRole, authControllers.findAllUser);
router.post("/jobvacancy", verifyToken, checkRole, vacancyController.insert);
router.get("/alljobs", verifyToken, checkRole, vacancyController.findadminjobs);
router.get("/jobvacancy/:id?", verifyToken, checkRole, vacancyController.selectAdminjob);
router.patch("/jobvacancyupdate/:id?", verifyToken, checkRole, vacancyController.updateJob);



//user
 router.post("/profile", verifyToken,profileController.insert);
 router.patch("/profileedit", verifyToken,profileController.update);
 router.get("/findjobs", verifyToken, vacancyController.Finduserjob);
 router.get("/jobdetail/:id?",verifyToken, vacancyController.userjob);
 router.post("/applyjob/:id?", verifyToken, applyController.applyjob);


module.exports = router;