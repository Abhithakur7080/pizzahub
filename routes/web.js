import homeControllers from "../app/http/controllers/homeControllers.js";
import authControllers from "../app/http/controllers/authControllers.js";
import cartControllers from "../app/http/controllers/customers/cartControllers.js";
import orderControllers from "../app/http/controllers/customers/orderController.js";
import AdminOrderControllers from "../app/http/controllers/admin/orderControllers.js";
import guest from '../app/http/middlewares/guest.js'
import auth from '../app/http/middlewares/auth.js'

const initRoutes = (app) => {
  //default route
  app.get("/", homeControllers().index);

  //auth routes
  app.get("/login", guest, authControllers().login);
  app.post("/login", authControllers().postlogin);
  app.get("/register", guest, authControllers().register);
  app.post('/register', authControllers().postregister);
  app.post('/logout', authControllers().logout)

  app.get("/cart", cartControllers().index);
  app.post('/update-carts', cartControllers().update);

  //Customer routes
  app.post("/orders", auth, orderControllers().store);
  app.get('/customers/orders', auth, orderControllers().index)
  
  //Admin routes
  app.get('/admin/orders', auth, AdminOrderControllers().index)
}

export default initRoutes;
