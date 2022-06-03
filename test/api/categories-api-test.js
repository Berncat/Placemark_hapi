import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { maggie, testCategories, testCategory, updatedCategory } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Categories API tests", () => {
  let user = null;

  setup(async () => {
    await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllCategories();
    for (let i = 0; i < testCategories.length; i += 1) {
      testCategories[i].userId = maggie._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createCategory(user._id, testCategories[i]);
    }
  });
  teardown(async () => {
    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllUsers();
  });

  test("create category", async () => {
    const category = await placemarkService.createCategory(user._id, testCategory);
    assert.isNotNull(category);
    assertSubset(testCategory, category);
  });

  test("delete a category", async () => {
    const category = await placemarkService.createCategory(user._id, testCategory);
    const response = await placemarkService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      await placemarkService.getCategory(category._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("edit a category", async () => {
    const category = await placemarkService.createCategory(user._id, testCategory);
    const currentList = await placemarkService.getAllCategories();
    const response = await placemarkService.editCategory(category._id, updatedCategory);
    const newList = await placemarkService.getAllCategories();
    assert.equal(currentList.length, newList.length);
    assert.equal(category._id, response._id);
    assert.notEqual(category.name, response.name);
  });

  test("get user categories", async () => {
    const categories = await placemarkService.getCategoriesByUser(user._id);
    assert.equal(categories.length, testCategories.length);
  });

  test("create category non-existant user", async () => {
    try {
      await placemarkService.createCategory("111111111111111111111111", testCategory);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id", "Incorrect Response Message");
    }
  });

  test("remove non-existant category", async () => {
    try {
      await placemarkService.deleteCategory("111111111111111111111111");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("edit category non-existant id", async () => {
    try {
      await placemarkService.editCategory("111111111111111111111111", updatedCategory);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("get user categories non-existant user", async () => {
    try {
      await placemarkService.getCategoriesByUser("111111111111111111111111");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id", "Incorrect Response Message");
    }
  });
});
