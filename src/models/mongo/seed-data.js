export const seedData = {
  users: {
    _model: "User",
    bernard: {
      firstName: "Bernard",
      lastName: "Cattigan",
      email: "b.cattigan@placemark.ie",
      password: "secret123",
    },
    admin: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@placemark.ie",
      password: "secret123",
    },
  },
  categories: {
    _model: "Category",
    category1: {
      name: "Weather Stations",
      filter: "Type of Weather Station",
      userId: "->users.bernard",
    },
    category2: {
      name: "Places I have visited in Ireland",
      filter: "Year visited",
      userId: "->users.bernard",
    },
  },
};
