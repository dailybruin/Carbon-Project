const Router = require("express-promise-router");
const DesignNoteRouter = require("./designNotes");
const ModularRouter = require("./modulars");
const ScheduleRouter = require("./schedule");
const StoryRouter = require("./story");
const MemberRouter = require("./member");
const ProjectRouter = require("./project");
// const GitRouter = require("./gitApi");
const AwsRouter = require("./awsApi");
const AdminRouter = require("./admin");
const GrapesStorageRouter = require("./grapesStorage");

const router = new Router();

router.get("/", async (req, res) => {
  console.log(req.user);
  res.status(200).send("Welcome to Carbon's API");
});

router.use("/designNotes", DesignNoteRouter);
router.use("/modular", ModularRouter);
router.use("/schedule", ScheduleRouter);
router.use("/story", StoryRouter);
router.use("/staff", MemberRouter);
router.use("/projects", ProjectRouter);
// router.use("/git", GitRouter);
router.use("/aws", AwsRouter);
router.use("/admin", AdminRouter);
router.use("/grapesStorage", GrapesStorageRouter);

router.get("/isAdmin", async (req, res) => {
  const adminArray = process.env.ADMINS ? process.env.ADMINS.split(",") : [];
  const isAdmin = adminArray.includes(req.user.email);
  res.json({
    isAdmin: isAdmin,
  });
});

module.exports = router;
