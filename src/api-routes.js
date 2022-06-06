import { userApi } from "./api/users-api.js";
import { categoriesApi } from "./api/categories-api.js";
import { placemarksApi } from "./api/placemarks-api.js";

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

  { method: "GET", path: "/api/placemarks", config: placemarksApi.find },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarksApi.findOne },
  { method: "GET", path: "/api/placemarks/user/{id}", config: placemarksApi.findByUser },
  { method: "POST", path: "/api/placemarks/user/{id}/category/{cId}", config: placemarksApi.create },
  { method: "POST", path: "/api/placemarks/{id}", config: placemarksApi.edit },
  { method: "DELETE", path: "/api/placemarks/{id}", config: placemarksApi.deleteOne },
  { method: "DELETE", path: "/api/placemarks", config: placemarksApi.deleteAll },
];
