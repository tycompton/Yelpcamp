const User = require("../models/user");

// ***** RENDER REGISTER SCREEN *****
module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

// ***** POST REGISTER *****
module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to YelpCamp");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

// ***** RENDER LOGIN SCREEN *****
module.exports.renderLogin = (req, res) => {
  res.render('users/login');
};

// ***** POST LOGIN SCREEN *****
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

// ***** LOGOUT SCREEN *****
module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Missing you already!");
  res.redirect("/campgrounds");
};