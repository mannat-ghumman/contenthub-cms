import api from "./api";

export const getDashboardStats = async () => {

    const [blogs, videos, categories] = await Promise.all([

        api.get("/blogs"),

        api.get("/videos"),

        api.get("/categories")

    ]);

    return {

        blogs: blogs.data.data.length,

        videos: videos.data.data.length,

        categories: categories.data.data.length

    };

};