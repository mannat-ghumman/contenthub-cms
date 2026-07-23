const Blog = require("../models/Blog");
const slugify = require("../utils/slugify");
const { success, error } = require("../utils/response");

exports.createBlog = async (req, res) => {
    try {

        const {
            title,
            content,
            thumbnail,
            category_id,
            status
        } = req.body;

        if (!title || !content || !category_id) {
            return error(
                res,
                "Title, Content and Category are required",
                400
            );
        }

        const slug = slugify(title);

        const blog = await Blog.createBlog({
            title,
            slug,
            content,
            thumbnail,
            author_id: req.user.id,
            category_id,
            status: status || "draft"
        });

        return success(
            res,
            "Blog created successfully",
            blog,
            201
        );

    } catch (err) {

        console.log(err);

        return error(res, err.message);

    }
};

exports.getAllBlogs = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const search = req.query.search || "";

        const blogs = await Blog.getAllBlogs(
            search,
            limit,
            offset
        );

        return success(
            res,
            "Blogs fetched successfully",
            blogs
        );

    } catch (err) {

        console.log(err);

        return error(res, err.message);

    }

};

exports.getBlogById = async (req, res) => {

    try {

        const blog = await Blog.getBlogById(req.params.id);

        if (!blog) {

            return error(
                res,
                "Blog not found",
                404
            );

        }

        return success(
            res,
            "Blog fetched successfully",
            blog
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

exports.getBlogBySlug = async (req, res) => {

    try {

        const blog = await Blog.getBlogBySlug(
            req.params.slug
        );

        if (!blog) {

            return error(
                res,
                "Blog not found",
                404
            );

        }

        return success(
            res,
            "Blog fetched successfully",
            blog
        );

    } catch (err) {

        console.log(err);

        return error(res, err.message);

    }

};

exports.updateBlog = async (req, res) => {

    try {

        const blog = await Blog.getBlogById(req.params.id);

        if (!blog) {

            return error(
                res,
                "Blog not found",
                404
            );

        }

        if (
            blog.author_id !== req.user.id &&
            req.user.role !== "admin"
        ) {

            return error(
                res,
                "Access denied",
                403
            );

        }

        const slug = slugify(req.body.title);

        const updatedBlog = await Blog.updateBlog(
            req.params.id,
            {
                title: req.body.title,
                slug,
                content: req.body.content,
                thumbnail: req.body.thumbnail,
                category_id: req.body.category_id,
                status: req.body.status
            }
        );

        return success(
            res,
            "Blog updated successfully",
            updatedBlog
        );

    } catch (err) {

        console.log(err);

        return error(res, err.message);

    }

};

exports.deleteBlog = async (req, res) => {

    try {

        const blog = await Blog.getBlogById(req.params.id);

        if (!blog) {

            return error(
                res,
                "Blog not found",
                404
            );

        }

        if (
            blog.author_id !== req.user.id &&
            req.user.role !== "admin"
        ) {

            return error(
                res,
                "Access denied",
                403
            );

        }

        await Blog.deleteBlog(req.params.id);

        return success(
            res,
            "Blog deleted successfully"
        );

    } catch (err) {

        console.log(err);

        return error(res, err.message);

    }

};