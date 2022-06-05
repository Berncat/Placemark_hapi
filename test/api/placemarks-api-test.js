import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { maggie, testCategory, testPlacemarks, testPlacemark, updatedPlacemark } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemarks API tests", () => {
  let user = null;
  let category = null;

  setup(async () => {
    await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggie);
    await placemarkService.deleteAllCategories();
    category = await placemarkService.createCategory(user._id, testCategory);
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlacemark(user._id, category._id, testPlacemarks[i]);
    }
  });
  teardown(async () => {
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllCategories();
    await placemarkService.deleteAllUsers();
  });

  test("create placemark", async () => {
    const placemark = await placemarkService.createPlacemark(user._id, category._id, testPlacemark);
    assert.isNotNull(placemark);
    assertSubset(testPlacemark, placemark);
  });

  test("delete a placemark", async () => {
    const placemark = await placemarkService.createPlacemark(user._id, category._id, testPlacemark);
    const response = await placemarkService.deletePlacemark(placemark._id);
    assert.equal(response.status, 204);
    try {
      await placemarkService.getPlacemark(placemark._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id", "Incorrect Response Message");
    }
  });

  test("edit a placemark", async () => {
    const placemark = await placemarkService.createPlacemark(user._id, category._id, testPlacemark);
    const currentList = await placemarkService.getAllPlacemarks();
    const response = await placemarkService.editPlacemark(placemark._id, updatedPlacemark);
    const newList = await placemarkService.getAllPlacemarks();
    assert.equal(currentList.length, newList.length);
    assert.equal(placemark._id, response._id);
    assert.notEqual(placemark.name, response.name);
  });

  test("get user placemarks", async () => {
    const placemarks = await placemarkService.getPlacemarksByUser(user._id);
    assert.equal(placemarks.length, testPlacemarks.length);
  });

  test("create placemark non-existant user", async () => {
    try {
      await placemarkService.createPlacemark("111111111111111111111111", category._id, testPlacemark);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id", "Incorrect Response Message");
    }
  });

  test("create placemark non-existant category", async () => {
    try {
      await placemarkService.createPlacemark(user._id, "111111111111111111111111", testPlacemark);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("remove non-existant placemark", async () => {
    try {
      await placemarkService.deletePlacemark("111111111111111111111111");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id", "Incorrect Response Message");
    }
  });

  test("edit placemark non-existant id", async () => {
    try {
      await placemarkService.editPlacemark("111111111111111111111111", updatedPlacemark);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placemark with this id", "Incorrect Response Message");
    }
  });

  test("get user placemarks non-existant user", async () => {
    try {
      await placemarkService.getPlacemarksByUser("111111111111111111111111");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id", "Incorrect Response Message");
    }
  });
});
