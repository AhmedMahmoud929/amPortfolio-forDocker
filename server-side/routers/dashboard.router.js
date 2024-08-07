const router = require("express").Router();
const Project = require("../models/projects.model");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// => POST New Project
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Get The URL
    const { secure_url } = await cloudinary.v2.uploader.upload(req.file.path);
    // Create The New Project
    const newProject = new Project({
      link: req.body.link,
      category: req.body.category,
      image: secure_url,
    });
    // Save The Project
    await newProject.save();
    res.status(200).json({ newProject });
  } catch (error) {
    res.status(404).json({ error });
  }
});

// => PUT A Project
router.put("/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  try {
    const project = await Project.findById(id);
    const image = req.file ? req.file.filename : project.image;
    await project.updateOne({
      link: req.body.link,
      category: req.body.category,
      image: image,
    });
    res.status(200).json({ message: "Project Updated Successfully" });
  } catch (error) {
    res.status(404).json(error);
  }
});

// => DELETE A Project
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Project Deleted Successfully" });
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
