const Router = require("express-promise-router");
const { Project } = require("../../db");
const router = new Router();

router.get("/storage/:projectId", async (req, res, next) => {
  res.status(500).json({ message: "Not Implemented yet" });
});

router.post("/storage/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const projectDetail = req.body;

    const projectToSave = await Project.findById(projectId);

    projectToSave.content = projectDetail;
    await projectToSave.save();

    res.status(200).json({ projectToSave });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
