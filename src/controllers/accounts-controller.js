import { db } from "../models/db.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("Main", { title: "Welcome!" });
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("Signup", { title: "Sign up" });
    },
  },
  signup: {
    auth: false,
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/login");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("Login", { title: "Login" });
    },
  },
  login: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
  oauth: {
    auth: "google",
    handler: async function (request, h) {
      if (request.auth.isAuthenticated) {
        const oauthUser = {
          firstName: request.auth.credentials.profile.name.given_name,
          lastName: request.auth.credentials.profile.name.family_name,
          email: request.auth.credentials.profile.email,
          password: request.auth.credentials.profile.name.given_name,
        };
        const user = await db.userStore.getUserByEmail(oauthUser.email);
        if (!user) {
          await db.userStore.addUser(oauthUser);
        }
        const checkUser = await db.userStore.getUserByEmail(oauthUser.email);
        request.cookieAuth.set({ id: checkUser._id });
        return h.redirect("/dashboard");
      }
      return h.redirect("/login");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },
};
