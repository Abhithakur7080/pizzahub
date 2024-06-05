import homeControllers from "../app/http/controllers/homeControllers.js";
import authControllers from "../app/http/controllers/authControllers.js";
import cartControllers from "../app/http/controllers/customers/cartControllers.js";
import orderControllers from "../app/http/controllers/customers/orderController.js";
import AdminOrderControllers from "../app/http/controllers/admin/orderControllers.js";
import statusControllers from "../app/http/controllers/admin/statusControllers.js";


import guest from '../app/http/middlewares/guest.js'
import auth from '../app/http/middlewares/auth.js'
import admin from '../app/http/middlewares/admin.js'

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
  app.get('/customers/orders/:id', auth, orderControllers().show)
  
  //Admin routes
  app.get('/admin/orders', admin, AdminOrderControllers().index)
  app.post('/admin/order/status', admin, statusControllers().update)
}

export default initRoutes;
