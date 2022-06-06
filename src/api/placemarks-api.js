import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const placemarksApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        return placemark;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findByUser: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        const placemarks = await db.placemarkStore.getPlacemarksByUserId(request.params.id);
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        if (request.payload.filter === "other") {
          request.payload.filter = request.payload.other;
        }
        delete request.payload.other;
        const placemark = request.payload;
        const category = await db.categoryStore.getCategoryById(request.params.cId);
        const user = await db.userStore.getUserById(request.params.id);
        placemark.userId = request.params.id;
        placemark.categoryId = request.params.cId;
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        if (!category) {
          return Boom.notFound("No Category with this id");
        }
        placemark.categoryName = category.name;
        const newPlacemark = await db.placemarkStore.addPlacemark(placemark);
        if (newPlacemark) {
          return h.response(newPlacemark).code(201);
        }
        return Boom.badImplementation("error creating placemark");
      } catch (err) {
        console.log(err)
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  edit: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        if (request.payload.filter === "other") {
          request.payload.filter = request.payload.other;
        }
        delete request.payload.other;
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        const updatedPlacemark = await db.placemarkStore.editPlacemark(request.params.id, request.payload);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        if (updatedPlacemark) {
          return h.response(updatedPlacemark).code(201);
        }
        return Boom.badImplementation("error editing placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        await db.placemarkStore.deletePlacemarkById(placemark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
