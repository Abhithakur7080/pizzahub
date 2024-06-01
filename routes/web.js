const homeControllers = require("../app/http/controllers/homeControllers");
const authControllers = require("../app/http/controllers/authControllers");
const cartControllers = require("../app/http/controllers/customers/cartControllers");

function initRoutes(app) {
  app.get("/", homeControllers().index);
  app.get("/login", authControllers().login);
  app.get("/register", authControllers().register);


  app.get("/cart", cartControllers().index);
  app.post('/update-carts', cartControllers().update)
}
module.exports = initRoutes;
