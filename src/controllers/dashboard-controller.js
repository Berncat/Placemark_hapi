import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const categories = await db.categoryStore.getUserCategories(loggedInUser._id);
      const viewData = {
        title: "Dashboard",
        user: loggedInUser,
        categories: categories,
        add: false,
        edit: false,
      };
      return h.view("Dashboard", viewData);
    },
  },

  newCategory: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      return h.view("Dashboard", { add: true, user: loggedInUser });
    },
  },

  addCategory: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCategory = request.payload;
      newCategory.userId = loggedInUser._id;
      await db.categoryStore.addCategory(newCategory);
      return h.redirect("/dashboard");
    },
  },

  deleteCategory: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const loggedInUser = request.auth.credentials;
      const flag = await db.categoryStore.checkUser(loggedInUser, category);
      if (flag) {
        await db.categoryStore.deleteCategoryById(category._id);
        return h.redirect("/dashboard");
      }
      return h.redirect("/logout");
    },
  },

  viewCategory: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const loggedInUser = request.auth.credentials;
      const flag = await db.categoryStore.checkUser(loggedInUser, category);
      if (flag) {
        const edit = true;
        return h.view("Dashboard", { category: category, edit: edit, user: loggedInUser });
      }
      return h.redirect("/logout");
    },
  },

  editCategory: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const loggedInUser = request.auth.credentials;
      const flag = await db.categoryStore.checkUser(loggedInUser, category);
      const updatedCategory = request.payload;
      if (flag) {
        await db.categoryStore.editCategory(request.params.id, updatedCategory);
        return h.redirect("/dashboard");
      }
      return h.redirect("/logout");
    },
  },

  report: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      return h.view("Report", {
        title: "Report",
        user: loggedInUser,
      });
    },
  },
};
