import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/users`);
      return res.data;
    } catch (error) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async getAllCategories() {
    const res = await axios.get(`${this.placemarkUrl}/api/categories`);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/categories/${id}`);
    return res.data;
  },

  async getCategoriesByUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/categories/user/${id}`);
    return res.data;
  },

  async createCategory(id, category) {
    const res = await axios.post(`${this.placemarkUrl}/api/categories/user/${id}`, category);
    return res.data;
  },

  async editCategory(id, updatedCategory) {
    const res = await axios.post(`${this.placemarkUrl}/api/categories/${id}`, updatedCategory);
    return res.data;
  },

  async deleteCategory(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/categories/${id}`);
    return res;
  },

  async deleteAllCategories() {
    const res = await axios.delete(`${this.placemarkUrl}/api/categories`);
    return res.data;
  },

  async getAllPlacemarks() {
    const res = await axios.get(`${this.placemarkUrl}/api/placemarks`);
    return res.data;
  },

  async getPlacemark(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/placemarks/${id}`);
    return res.data;
  },

  async getPlacemarksByUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/placemarks/user/${id}`);
    return res.data;
  },

  async createPlacemark(id, cId, placemark) {
    const res = await axios.post(`${this.placemarkUrl}/api/placemarks/user/${id}/category/${cId}`, placemark);
    return res.data;
  },

  async editPlacemark(id, updatedPlacemark) {
    const res = await axios.post(`${this.placemarkUrl}/api/placemarks/${id}`, updatedPlacemark);
    return res.data;
  },

  async deletePlacemark(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/placemarks/${id}`);
    return res;
  },

  async deleteAllPlacemarks() {
    const res = await axios.delete(`${this.placemarkUrl}/api/placemarks`);
    return res.data;
  },
};
