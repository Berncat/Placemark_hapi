import { userApi } from "./api/users-api.js";
import { categoriesApi } from "./api/categories-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/categories", config: categoriesApi.find },
  { method: "GET", path: "/api/categories/{id}", config: categoriesApi.findOne },
  { method: "GET", path: "/api/categories/user/{id}", config: categoriesApi.findByUser },
  { method: "POST", path: "/api/categories/user/{id}", config: categoriesApi.create },
  { method: "POST", path: "/api/categories/{id}", config: categoriesApi.edit },
  { method: "DELETE", path: "/api/categories/{id}", config: categoriesApi.deleteOne },
  { method: "DELETE", path: "/api/categories", config: categoriesApi.deleteAll },
];
