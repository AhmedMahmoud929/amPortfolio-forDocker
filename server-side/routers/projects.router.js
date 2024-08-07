const router = require("express").Router();
const Project = require("../models/projects.model");

// => GET Projects
router.get("/", async (req, res) => {
  const category = req.query.category;
  //   All Projects
  if (!category || category === "all") {
    try {
      const allProjects = await (await Project.find({})).reverse();
      res.status(200).json({ allProjects });
    } catch (error) {
      res.status(404).json({ error });
    }
  }
  //   Filtered Projects
  else {
    try {
      const filteredProjects = await Project.find({ category: category });
      res.status(200).json({ filteredProjects });
    } catch (error) {
      res.status(404).json({ error });
    }
  }
});

// => GET Single Project
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const project = await Project.findById(id);
    res.status(200).json({ project });
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;
