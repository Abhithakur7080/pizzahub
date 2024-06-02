import Menu from "../../models/menu.js";

const homeControllers = () => {
  return {
    async index(req, res) {
      try {
        // Menu.find().then((pizzas) => {
      //     console.log(pizzas);
      //     return res.render("home", { pizzas: pizzas});
      // })
        const pizzas = await Menu.find();
        return res.render("home", { pizzas: pizzas });
      } catch (error) {
        console.error("Error fetching menu items:", error);
        return res.status(500).send("Internal Server Error");
      }
    },
  };
}

export default homeControllers;
