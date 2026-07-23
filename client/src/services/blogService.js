import api from "./api";

export const getBlogs = (params = {}) => {
    return api.get("/blogs", { params });
};

export const getBlogBySlug = (slug) => {
    return api.get(`/blogs/${slug}`);
};

export const getBlogById = (id) => {
    return api.get(`/blogs/id/${id}`);
};

export const createBlog = (data) => {
    return api.post("/blogs", data);
};

export const updateBlog = (id, data) => {
    return api.put(`/blogs/${id}`, data);
};

export const deleteBlog = (id) => {
    return api.delete(`/blogs/${id}`);
};