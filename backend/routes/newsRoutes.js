const express = require("express");
const router = express.Router();

const multer = require("multer");
const News = require("../models/News");
const auth = require("../middleware/auth");


// STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


// ADD NEWS
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const news = new News({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      time: req.body.time,
      comments: req.body.comments,
      views: req.body.views,
      image: "http://localhost:5000/uploads/" + req.file.filename,
    });

    const savedNews = await news.save();
    res.json(savedNews);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET ALL NEWS
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET CATEGORY NEWS
router.get("/category/:category", async (req, res) => {
  try {
    const news = await News.find({
      category: req.params.category,
    }).sort({ createdAt: -1 });

    res.json(news);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET SINGLE NEWS BY ID
router.get("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({
        message: "News not found",
      });
    }

    res.json(news);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE SINGLE NEWS
router.delete("/:id", auth, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);

    res.json({
      message: "News Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// 🗑️ DELETE ALL NEWS (NEW FEATURE)
router.delete("/", auth, async (req, res) => {
  try {
    await News.deleteMany({});

    res.json({
      message: "All News Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;