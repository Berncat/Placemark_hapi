import { Category } from "./category.js";
import { placemarkMongoStore } from "./placemark-mongo-store.js";

export const categoryMongoStore = {
  async getAllCategories() {
    const categories = await Category.find().lean();
    return categories;
  },

  async getCategoryById(id) {
    if (id) {
      const category = await Category.findOne({ _id: id }).lean();
      if (category) {
        category.placemarks = await placemarkMongoStore.getPlacemarksByCategoryId(category._id);
        category.filterList = await placemarkMongoStore.getFilterList(category._id);
      }
      return category;
    }
    return null;
  },

  async getUserCategories(id) {
    if (id) {
      const categories = await Category.find({ userId: id }).lean();
      await Promise.all(categories.map(async (category) => {
        category.filterList = await placemarkMongoStore.getFilterList(category._id);
        return categories;
      }));
      return categories;
    }
    return null;
  },


  async addCategory(category) {
    const newCategory = new Category(category);
    const categoryObj = await newCategory.save();
    const c = await this.getCategoryById(categoryObj._id);
    return c;
  },

  async deleteCategoryById(id) {
    try {
      await Category.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteUserCategories(id) {
    try {
      await Category.deleteMany({ userId: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await Category.deleteMany({});
  },

  async editCategory(id, updatedCategory) {
    await Category.findByIdAndUpdate(id, { name: updatedCategory.name, filter: updatedCategory.filter });
    const c = await this.getCategoryById(id);
    return c;
  },

  async checkUser(user, category) {
    const checkCategories = await this.getUserCategories(user._id);
    return checkCategories.some((check) => check._id.toString() === category._id.toString());
  },
};
