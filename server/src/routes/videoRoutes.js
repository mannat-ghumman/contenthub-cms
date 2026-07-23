const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const videoController = require("../controllers/videoController");

router.post("/", auth, videoController.createVideo);

router.get("/", videoController.getAllVideos);

router.get("/:id", auth, videoController.getVideoById);

router.put("/:id", auth, videoController.updateVideo);

router.delete("/:id", auth, videoController.deleteVideo);

module.exports = router;