const Router = require("express-promise-router");

const { 
  checkAdmin, 
  getAllUsers,
  getAllProjects,
  isAdmin,
  isSuperAdmin,
  promote, 
  demote, 
  approve, 
  deny,
  createSection,
  deleteSection,
  getAllSections,
  assignSection,
  removeSection,
} = require("../../controllers/adminController");

const router = new Router();

router.get("/is_admin", checkAdmin);
router.get("/users", isAdmin, getAllUsers);
router.get("/projects", isAdmin, getAllProjects);

router.post("/promote", isAdmin, promote);
router.post("/demote", isSuperAdmin, demote);
router.post("/approve", isAdmin, approve);
router.post("/deny", isAdmin, deny);

router.post("/createSection", isAdmin, createSection);
router.delete("/:sectionid", isAdmin, deleteSection);
router.get("/sections", isAdmin, getAllSections);
router.post("/assign", isAdmin, assignSection);
router.post("/remove", isAdmin, removeSection);


module.exports = router;
