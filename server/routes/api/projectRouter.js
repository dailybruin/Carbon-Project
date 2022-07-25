const Router = require("express-promise-router");
const { read } = require("fs");

const {
    getAllProject,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    readyToView,
} = require("../../controllers/projectController");

const router = new Router();

router.get("/", getAllProject);
router.get("/:projectId", getProjectById);
router.post("/create", createProject);
router.post("/:projectId", updateProject);
router.delete("/:projectid", deleteProject);
router.post("/readyToView", readyToView);

module.exports = router;
