import api from "./api";

export const getVideos = () => {
  return api.get("/videos");
};

export const getVideo = (id) => {
  return api.get(`/videos/${id}`);
};

export const createVideo = (data) => {
  return api.post("/videos", data);
};

export const updateVideo = (id, data) => {
  return api.put(`/videos/${id}`, data);
};

export const deleteVideo = (id) => {
  return api.delete(`/videos/${id}`);
};