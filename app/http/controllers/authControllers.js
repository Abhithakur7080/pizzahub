import passport from "passport";
import User from "../../models/user.js";
import bcrypt from "bcrypt";

const authControllers = () => {
  const _getRedirectUrl = (req) => {
    return req.user.role === "admin" ? "/admin/orders" : "/customers/orders";
  };
  return {
    login(req, res) {
      res.render("auth/login");
    },
    postlogin(req, res, next) {
      const { email, password } = req.body;
      // Validate request
      if (!email || !password) {
        req.flash("error", "All fields are required");
        req.flash("email", email);
        return res.redirect("/login");
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, () => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          return res.redirect(_getRedirectUrl(req));
        });
      })(req, res, next);
    },
    register(req, res) {
      res.render("auth/register");
    },
    async postregister(req, res) {
      const { name, email, password } = req.body;

      // Validate request
      if (!name || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      try {
        // Check if email exists
        const userExists = await User.exists({ email: email });
        if (userExists) {
          req.flash("error", "Email already taken");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
          name,
          email,
          password: hashedPassword,
        });
        await user.save();
        return res.redirect("/");
      } catch (err) {
        req.flash("error", "Something went wrong");
        return res.redirect("/register");
      }
    },
    logout(req, res) {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/login");
      });
    },
  };
};

export default authControllers;
