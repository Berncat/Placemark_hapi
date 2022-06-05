import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async getPlacemarksByCategoryId(id) {
    if (id) {
      const placemarks = await Placemark.find({ categoryId: id }).lean();
      return placemarks;
    }
    return null;
  },

  async getPlacemarksByUserId(id) {
    if (id) {
      const placemarks = await Placemark.find({ userId: id }).lean();
      return placemarks;
    }
    return null;
  },

  async getFilterList(id) {
    const filterList = await Placemark.distinct("filter", {categoryId: id})
    return filterList;
  },

  async filterPlacemarks(id, filter) {
    if (id) {
      const placemarks = await Placemark.find({ categoryId: id, filter: filter }).lean();
      return placemarks;
    }
    return null;
  },

  async addPlacemark(placemark) {
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    const p = await this.getPlacemarkById(placemarkObj._id);
    return p;
  },

  async deletePlacemarkById(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteCategoryPlacemarks(id) {
    try {
      await Placemark.deleteMany({ categoryId: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteUserPlacemarks(id) {
    try {
      await Placemark.deleteMany({ userId: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await Placemark.deleteMany({});
  },

  async editPlacemark(id, updatedPlacemark) {
    await Placemark.findByIdAndUpdate(id, {
      name: updatedPlacemark.name,
      lat: updatedPlacemark.lat,
      lon: updatedPlacemark.lon,
      desc: updatedPlacemark.desc,
      filter: updatedPlacemark.filter,
    });
    const p = await this.getPlacemarkById(id);
    return p;
  },
};
