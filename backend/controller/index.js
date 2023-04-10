const authControllers = require("./auth");
const profileController = require("./profile");
const vacancyController = require("./jobvacancy");
const applyController = require("./jobapplicant");


module.exports = {
    vacancyController,
    authControllers,
    profileController,
    applyController
}