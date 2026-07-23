const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
const blogRoutes=require("./routes/blogRoutes");
const categoryRoutes =
require("./routes/categoryRoutes");
const videoRoutes=require("./routes/videoRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");




app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs",blogRoutes);
app.use(
    "/api/categories",
    categoryRoutes
);
app.use(
    "/api/dashboard",
    dashboardRoutes
);
app.use("/api/videos",videoRoutes);

app.get("/", (req, res) => {

    res.json({
        message: "CMS Backend Running"
    });

});

module.exports = app;