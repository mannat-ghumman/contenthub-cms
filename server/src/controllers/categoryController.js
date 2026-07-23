const Category = require("../models/Category");
const { success, error } = require("../utils/response");

exports.createCategory = async (req, res) => {

    try {

        const { name, type } = req.body;

        if (!name || !type) {

            return error(
                res,
                "Name and type are required",
                400
            );

        }

        const category = await Category.createCategory(
            name,
            type
        );

        return success(
            res,
            "Category created successfully",
            category,
            201
        );

    }

    catch (err) {

        console.log(err);

        if (err.code === "23505") {

            return error(
                res,
                "Category already exists",
                400
            );

        }

        return error(
            res,
            err.message
        );

    }

};

exports.getAllCategories = async (req, res) => {

    try {

        const categories =
            await Category.getAllCategories();

        return success(
            res,
            "Categories fetched successfully",
            categories
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

exports.updateCategory = async (req, res) => {

    try {

        const category =
            await Category.getCategoryById(req.params.id);

        if (!category) {

            return error(
                res,
                "Category not found",
                404
            );

        }

        const updated =
            await Category.updateCategory(

                req.params.id,

                req.body.name,

                req.body.type

            );

        return success(
            res,
            "Category updated successfully",
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

exports.deleteCategory = async (req, res) => {

    try {

        const category =
            await Category.getCategoryById(req.params.id);

        if (!category) {

            return error(
                res,
                "Category not found",
                404
            );

        }

        await Category.deleteCategory(req.params.id);

        return success(
            res,
            "Category deleted successfully"
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