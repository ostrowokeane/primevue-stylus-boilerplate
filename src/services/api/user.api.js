import http from "./http";

export default {
  getUserInfo: () => http.get("/user")
};
