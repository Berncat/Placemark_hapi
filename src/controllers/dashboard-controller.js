export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      return h.view("Dashboard", { title: "Title", user: loggedInUser });
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
  action: {
    handler: async function (request, h) {
      try {
        const loggedInUser = request.auth.credentials;
        return h.redirect("/report");
      } catch (err) {
        return h.view("Main", { errors: [{ message: err.message }] });
      }
    },
  },
};
