import homeControllers from "../app/http/controllers/homeControllers.js";
import authControllers from "../app/http/controllers/authControllers.js";
import cartControllers from "../app/http/controllers/customers/cartControllers.js";
import guest from '../app/http/middlewares/guest.js'

const initRoutes = (app) => {
  app.get("/", homeControllers().index);
  app.get("/login", guest, authControllers().login);
  app.post("/login", authControllers().postlogin);
  app.get("/register", guest, authControllers().register);
  app.post('/register', authControllers().postregister);
  app.post('/logout', authControllers().logout)

  app.get("/cart", cartControllers().index);
  app.post('/update-carts', cartControllers().update);
}

export default initRoutes;
