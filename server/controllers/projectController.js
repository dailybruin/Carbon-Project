const { Project } = require("../db");
const { User } = require("../db");

const handleError = (res) => {
    res.status(400).json({ message: "bad" });
};

const getAllProject = async (req, res, next) => {
    let userId = req.user["_id"];
    try {
      User.findById(userId)
        .populate("projectsCreated")
        .then((user) => res.status(200).send(user.projectsCreated));
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false, message: err.message });
    }
}

const getProjectById = async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const projectToFetch = await Project.findById(projectId);

      const projectData = projectToFetch.content;
      res.status(200).json( projectData );
    } catch (error) {
      res.status(500).json({error, message: "Failed to get Grape.js project"});
    }
}

const createProject = async (req, res, next) => {
    try {
      const userId = req.user["_id"];
      const { name } = req.body;
  
      const user = await User.findById(userId);
  
      if (user === null) {
        res.status(400).json({ message: "User Not Found" });
      }
  
      const newProject = new Project({ name, createBy: userId });
      await newProject.save();
  
      user.projectsCreated.push(newProject._id);
      await user.save();
  
      res.status(200).json({ message: "success", project: newProject });
    } catch (error) {
      res.status(500).json({ error });
    }
}

const updateProject = async (req, res, next) => {
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
}

const deleteProject = async (req, res, next) => {
    let userId = req.user["_id"];
    let projectId = req.params.projectid;
    try {
      // Delete project from the projectsCreated field from the User collection.
      User.findById(userId, (err, user) => {
        let updatedProjectsCreated = user.projectsCreated.filter(
          (currProjectId) => {
            return String(currProjectId) !== projectId;
          }
        );
        user.projectsCreated = updatedProjectsCreated;
        user.save((err) => {
          if (err) {
            console.log(err);
            res.status(400).send("Error deleting project from User, try again");
          }
  
          // Delete the project from the Project collection
          Project.findByIdAndDelete(projectId, (err) => {
            if (err) {
              console.log(err);
              res.status(400).send("Error deleting project, try again later");
            }
            res.status(200).send("Successfully deleted Project!");
          });
        });
      });
    } catch (err) {
      handleError(res);
    }
}

const readyToView = async (req, res, next) => {
  try {
    const { id } = req.body;

    const project = await ProjectModel.findById(id); //built in mongoose function

    project.isApproved = false;
    project.status = "readyToView";
    await project.save();

    res.status(200).json({ message: "Project is currently under review" });
  } catch (error) {
    res.status(500).json({ error, message: "Fail to send for review" });
  }
};

module.exports = {
    getAllProject,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    readyToView,
};
