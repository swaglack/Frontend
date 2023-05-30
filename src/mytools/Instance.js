import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.swaglack.site",
});

export const PostApi = {
  getGaese: () => instance.get("/post/list"),
  getDetailGaese: postId => instance.get(`/post/${postId}`),
  postSlack: payload => instance.post("members/signupAuth", payload),
  postConfirmSlack: payload => instance.post("members/signup", payload),
};
