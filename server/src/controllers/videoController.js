const Video = require("../models/Video");

const {
    extractVideoId,
    getThumbnail
} = require("../utils/youtube");

const {
    success,
    error
} = require("../utils/response");

exports.createVideo = async (req, res) => {

    try {

        const {
            title,
            youtube_url,
            description,
            category_id
        } = req.body;

        if (!title || !youtube_url || !category_id) {

            return error(
                res,
                "Title, YouTube URL and Category are required",
                400
            );

        }

        const videoId = extractVideoId(youtube_url);

        if (!videoId) {

            return error(
                res,
                "Invalid YouTube URL",
                400
            );

        }

        const video = await Video.createVideo({

            title,

            youtube_url,

            youtube_id: videoId,

            thumbnail: getThumbnail(videoId),

            description,

            author_id: req.user.id,

            category_id

        });

        return success(
            res,
            "Video created successfully",
            video,
            201
        );

    }

    catch (err) {

        console.log(err);

        return error(
            res,
            err.message
        );

    }

};

exports.getAllVideos = async (req, res) => {

    try {

        const videos = await Video.getAllVideos();

        return success(
            res,
            "Videos fetched successfully",
            videos
        );

    }

    catch (err) {

        console.log(err);

        return error(
            res,
            err.message
        );

    }

};

exports.getVideoById = async (req, res) => {

    try {

        const video = await Video.getVideoById(req.params.id);

        if (!video) {

            return error(
                res,
                "Video not found",
                404
            );

        }

        return success(
            res,
            "Video fetched successfully",
            video
        );

    }

    catch (err) {

        console.log(err);

        return error(
            res,
            err.message
        );

    }

};

exports.updateVideo = async (req, res) => {

    try {

        const existing = await Video.getVideoById(req.params.id);

        if (!existing) {

            return error(
                res,
                "Video not found",
                404
            );

        }

        if (
            existing.author_id !== req.user.id &&
            req.user.role !== "admin"
        ) {

            return error(
                res,
                "Access denied",
                403
            );

        }

        const videoId = extractVideoId(req.body.youtube_url);

        if (!videoId) {

            return error(
                res,
                "Invalid YouTube URL",
                400
            );

        }

        const updated = await Video.updateVideo(

            req.params.id,

            {

                title: req.body.title,

                youtube_url: req.body.youtube_url,

                youtube_id: videoId,

                thumbnail: getThumbnail(videoId),

                description: req.body.description,

                category_id: req.body.category_id

            }

        );

        return success(
            res,
            "Video updated successfully",
            updated
        );

    }

    catch (err) {

        console.log(err);

        return error(
            res,
            err.message
        );

    }

};

exports.deleteVideo = async (req, res) => {

    try {

        const video = await Video.getVideoById(req.params.id);

        if (!video) {

            return error(
                res,
                "Video not found",
                404
            );

        }

        if (
            video.author_id !== req.user.id &&
            req.user.role !== "admin"
        ) {

            return error(
                res,
                "Access denied",
                403
            );

        }

        await Video.deleteVideo(req.params.id);

        return success(
            res,
            "Video deleted successfully"
        );

    }

    catch (err) {

        console.log(err);

        return error(
            res,
            err.message
        );

    }

};