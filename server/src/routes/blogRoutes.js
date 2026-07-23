const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const blogController = require("../controllers/blogController");

router.post("/", auth, blogController.createBlog);

router.get("/", blogController.getAllBlogs);

router.get("/id/:id", auth, blogController.getBlogById);

router.get("/:slug", blogController.getBlogBySlug);

router.put("/:id", auth, blogController.updateBlog);

router.delete("/:id", auth, blogController.deleteBlog);

module.exports = router;