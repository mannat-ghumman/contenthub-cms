const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { success, error } = require("../utils/response");

exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return error(
                res,
                "All fields are required",
                400
            );
        }

        const existing = await User.findByEmail(email);

        if (existing) {
            return error(
                res,
                "Email already exists",
                400
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.createUser(
            name,
            email,
            hashedPassword
        );

        return success(
            res,
            "User registered successfully",
            user,
            201
        );

    } catch (err) {

        console.log(err);

        return error(
            res,
            err.message
        );

    }
};

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return error(
                res,
                "Email and Password are required",
                400
            );
        }

        const user = await User.findByEmail(email);

        if (!user) {
            return error(
                res,
                "Invalid Credentials",
                400
            );
        }

        const match = await bcrypt.compare(
            password,
            user.password
        );

        if (!match) {
            return error(
                res,
                "Invalid Credentials",
                400
            );
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return success(
            res,
            "Login Successful",
            {
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        );

    } catch (err) {

        console.log(err);

        return error(
            res,
            err.message
        );

    }
};

exports.profile = async (req, res) => {

    try {

        return success(
            res,
            "Profile fetched successfully",
            req.user
        );

    } catch (err) {

        return error(
            res,
            err.message
        );

    }
};