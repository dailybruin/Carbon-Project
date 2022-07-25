// import user model
const UserModel = require("../db/models/User");
const ProjectModel = require("../db/models/Project");
const SectionModel = require("../db/models/Section");

const { User } = require("../db");
const { Section } = require("../db");

const isAuthenticated = async (req, res, next) => {
  // req.isAuthenticated() is a method passed from the passport
  // authentication that we can use to check whether
  // a user is authenticated.
  try {
    if (req.isAuthenticated()) {
      console.log(req.user);

      console.log("User is authenticated");
      return next();
    }
    console.log("User is NOT authenticated");
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ error, message: "Failed to check authentication" });
  }
}

const checkAdmin = async (req, res, next) => {
  try {
    const { user } = req;
    const isAdmin = user.admin || user.superAdmin;

    res.status(200).json({ isAdmin });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const { user } = req;
    const isSuperAdmin = user.superAdmin;
    let allUsers;

    if (isSuperAdmin) {
      allUsers = await User.find();
    } else {
      allUsers = await User.find({ admin: false, superAdmin: false });
    }

    res.status(200).json({
      allUsers,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const getAllProjects = async (req, res, next) => {
  // Cedric: I implement this way but I have not tested them yet. You can eleaborate them and test them.
  try {
    let allProjects = await ProjectModel.find();

    res.status(200).json({
      allProjects,
    });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get all projects" });
  }
}

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.admin || req.user.superAdmin) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "Unauthorized: You are not an admin  :P" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Failed to check if admin" });
  }
}

const isSuperAdmin = async (req, res, next) => {
  try {
    if (req.user.superAdmin) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "Unauthorized: You are not the super admin  :P" });
    }
  } catch (error) {
    res.status(500).json({ error, message: "Failed to check if super admin" });
  }
}

const promote = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await UserModel.findById(id); //built in mongoose function

    user.admin = true;
    await user.save();

    res.status(200).json({ message: "Promoted to admin" });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to promote" });
  }
};

const demote = async (req, res, next) => {
  //arrow function, use with react
  try {
    const { id } = req.body;
    const user = await UserModel.findById(id);

    user.admin = false;
    await user.save();

    res.status(200).json({ message: "Demoted to a regular user" });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to demote" });
  }
};


const createSection = async (req, res) => {
  try {
    // re.user.admin will not work in Postman, try to figure it out
    // if (req.user.admin || req.user.superAdmin) {
    //   const { sectionName } = req.body;
    //   const newSection = new Section({ sectionName });
    //   await newSection.save();

    //   res.status(200).json({ message: "New section created", section: newSection });
    // } else {
    //   res.status(401).json({ message: "Unauthorized: you are not an admin" });
    // }
    const { sectionName } = req.body;
    const newSection = new Section({ sectionName });
    await newSection.save();

    res.status(200).json({ message: "New section created", section: newSection });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to create section" });
  }
};

const deleteSection = async (req, res) => {
  try {
    // if (req.user.admin || req.user.superAdmin) {
    //   SectionModel.findByIdAndDelete(req.params.sectionid, (err) => {
    //     if (err) {
    //       console.log(err);
    //       res.status(400).json("Failed to delete section");
    //     }
    //     res.status(200).json("Successfully deleted section");
    //   });
    // } else {
    //   res.status(401).json({ message: "Unauthorized: you are not an admin" });
    // }
    SectionModel.findByIdAndDelete(req.params.sectionid, (err) => {
      if (err) {
        console.log(err);
        res.status(400).json("Failed to delete section");
      }
      res.status(200).json("Successfully deleted section");
    });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to delete section" });
  }
};

const getAllSections = async (req, res) => {
  try {
    let allSections = await SectionModel.find();

    // if (req.user.admin || req.user.superAdmin) {
    //   allSections = await SectionModel.find();
    // } else {
    //   res.status(401).json({ message: "Unauthorized: you are not an admin" });
    // }

    res.status(200).json({
      allSections,
    });
  } catch (error) {
    res.status(500).json({ error, message: "Failed to get all sections" });
  }
};


//Admin Powers: Approving, Denying, Changes Requested, Draft, and Ready to View

const approve = async (req, res, next) => {
  try {
    const { id } = req.body;

    const project = await ProjectModel.findById(id); //built in mongoose function

    project.isApproved = true;
    project.status = "Approved";
    await project.save();

    res.status(200).json({ message: "Project has been approved" });
  } catch (error) {
    res.status(500).json({ error, message: "Fail to approve" });
  }
};

const deny = async (req, res, next) => {
  try {
    const { id } = req.body;

    const project = await ProjectModel.findById(id); 

    project.isApproved = false;
    project.status = "Denied";
    await project.save();

    res.status(200).json({ message: "Project has been denied" });
  } catch (error) {
    res.status(500).json({ error, message: "Fail to deny" });
  }
};

const changesRequested = async (req, res, next) => {
  try {
    const { id } = req.body;

    const project = await ProjectModel.findById(id); 

    project.isApproved = false;
    project.status = "changesRequested";
    await project.save();

    res.status(200).json({ message: "There have been some changes requested for your project." });
  } catch (error) {
    res.status(500).json({ error, message: "Fail to send requests" });
  }
};

const draft = async (req, res, next) => {
  try {
    const { id } = req.body;

    const project = await ProjectModel.findById(id); 

    project.isApproved = false;
    project.status = "draft";
    await project.save();

    res.status(200).json({ message: "Project is drafted" });
  } catch (error) {
    res.status(500).json({ error, message: "Fail to draft" });
  }
};

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



// to be tested and wait for implementation of section shcema
const assignSection = async (req, res, next) => {
  try {
    const { userId, sectionId } = req.body;
    const user = await UserModel.findById(userId);
    const section = await SectionModel.findById(sectionId);

    user.sections.push(section._id);
    section.owner = user._id;

    await user.save();
    await section.save();

  } catch (error) {
    res.status(500).json({error, message: "Fail to assign user to section"});
  }
}

// to be tested and wait for implementation of section shcema
const removeSection = async (req, res, next) => {
  try {
    const { userId, sectionId } = req.body;
    const user = await UserModel.findById(userId);
    const section = await SectionModel.findById(sectionId);

    let updatedSections = user.sections.filter(
      (currSectionId) => {
        return String(currSectionId) !== sectionId;
      }
    );
    user.sections = updatedSections;

    section.owner = null;

    await user.save();
    await section.save();

  } catch (error) {
    res.status(500).json({error, message: "Fail to assign user to section"});
  }
}


module.exports = {
  isAuthenticated,
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
  changesRequested,
  readyToView,
  draft,
};
