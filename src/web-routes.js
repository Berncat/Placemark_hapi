import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { categoryController } from "./controllers/category-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "GET", path: "/dashboard/add", config: dashboardController.newCategory },
  { method: "POST", path: "/dashboard/add", config: dashboardController.addCategory },
  { method: "GET", path: "/dashboard/delete/{id}", config: dashboardController.deleteCategory },
  { method: "GET", path: "/dashboard/edit/{id}", config: dashboardController.viewCategory },
  { method: "POST", path: "/dashboard/edit/{id}", config: dashboardController.editCategory },

  { method: "GET", path: "/category/{id}", config: categoryController.index },
  { method: "GET", path: "/category/{id}/filter/{filter}", config: categoryController.filter },
  { method: "POST", path: "/filter", config: categoryController.filter },
  { method: "GET", path: "/category/{id}/add", config: categoryController.newPlacemark },
  { method: "POST", path: "/category/{id}/add", config: categoryController.addPlacemark },
  { method: "GET", path: "/category/{id}/delete/{pmId}", config: categoryController.deletePlacemark },
  { method: "GET", path: "/category/{id}/edit/{pmId}", config: categoryController.viewPlacemark },
  { method: "POST", path: "/category/{id}/edit/{pmId}", config: categoryController.editPlacemark },

  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false },
  },
];
