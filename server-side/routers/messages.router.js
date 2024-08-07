const router = require("express").Router();
const Message = require("../models/messages.model");
const checkAuth = require("../middlewares/auth.mw");

// => GET All Messages
router.get("/", checkAuth, async (req, res) => {
  try {
    const allMessages = await Message.find({});
    res.status(200).json({ allMessages });
  } catch (error) {
    res.status(404).json(error);
  }
});

// => POST A New Message
router.post("/", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(200).json({ newMessage });
  } catch (error) {
    res.status(404).json(error);
  }
});

// => DELETE A Messages
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message Deleted Successfully" });
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
