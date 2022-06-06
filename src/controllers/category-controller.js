import { db } from "../models/db.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const loggedInUser = request.auth.credentials;
      const flag = await db.categoryStore.checkUser(loggedInUser, category);
      const viewData = {
        title: category.name,
        user: loggedInUser,
        category: category,
      };
      if (flag) {
        return h.view("Placemarks", viewData);
      }
      return h.redirect("/logout");
    },
  },

  filter: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.payload.id);
      const loggedInUser = request.auth.credentials;
      const flag = await db.categoryStore.checkUser(loggedInUser, category);
      if (request.payload.filter !== "clear") {
        category.placemarks = await db.placemarkStore.filterPlacemarks(request.payload.id, request.payload.filter);
      }
      const viewData = {
        title: category.name,
        user: loggedInUser,
        category: category,
      };
      if (flag) {
        return h.view("Placemarks", viewData);
      }
      return h.redirect("/logout");
    },
  },

  newPlacemark: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const loggedInUser = request.auth.credentials;
      return h.view("Placemarks", { title: category.name, addPM: true, user: loggedInUser, category: category });
    },
  },

  addPlacemark: {
    handler: async function (request, h) {
      if (request.payload.filter === "other") {
        request.payload.filter = request.payload.other;
      }
      delete request.payload.other;
      const loggedInUser = request.auth.credentials;
      const newPlacemark = request.payload;
      newPlacemark.categoryId = request.params.id;
      newPlacemark.userId = loggedInUser._id;
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const flag = await db.categoryStore.checkUser(loggedInUser, category);
      if (flag) {
        await db.placemarkStore.addPlacemark(newPlacemark);
        return h.redirect(`/category/${request.params.id}`);
      }
      return h.redirect("/logout");
    },
  },

  deletePlacemark: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const loggedInUser = request.auth.credentials;
      const flag = await db.categoryStore.checkUser(loggedInUser, category);
      if (flag) {
        await db.placemarkStore.deletePlacemarkById(request.params.pmId);
        return h.redirect(`/category/${request.params.id}`);
      }
      return h.redirect("/logout");
    },
  },

  viewPlacemark: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const placemark = await db.placemarkStore.getPlacemarkById(request.params.pmId);
      const loggedInUser = request.auth.credentials;
      category.filterList.splice(category.filterList.indexOf(placemark.filter), 1);
      const flag = await db.categoryStore.checkUser(loggedInUser, category);
      if (flag) {
        return h.view("Placemarks", { category: category, placemark: placemark, editPM: true, user: loggedInUser });
      }
      return h.redirect("/logout");
    },
  },

  editPlacemark: {
    handler: async function (request, h) {
      if (request.payload.filter === "other") {
        request.payload.filter = request.payload.other;
      }
      delete request.payload.other;
      const loggedInUser = request.auth.credentials;
      const updatedPlacemark = request.payload;
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const flag = await db.categoryStore.checkUser(loggedInUser, category);
      if (flag) {
        await db.placemarkStore.editPlacemark(request.params.pmId, updatedPlacemark);
        return h.redirect(`/category/${request.params.id}`);
      }
      return h.redirect("/logout");
    },
  },
};
