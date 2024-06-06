<h1 align="center" style="font-size: 36px;"><img src="./public/img/logo.png" width=50/>PIZZA HUB</h1>

Pizzahub is a realtime pizza delivering application offers a dynamic and user-friendly platform for ordering pizza. Users can effortlessly browse the menu, add items to their cart, and choose between cash on delivery or secure card payment options. The application features real-time order status updates, allowing users to track their orders from preparation to delivery, ensuring they stay informed at every step.

On the administrative side, the app provides robust controls for managing orders and updating their status, facilitating efficient service and customer satisfaction. With seamless user authentication, customers can easily register and log in to place orders and review their order history. This comprehensive application ensures a smooth and satisfying pizza ordering experience for both customers and administrators.

- Hosted Link [Explore](https://pizzahub-qaym.onrender.com/)

### For Testing Admin side
- Email:
  ```
  admin@pizzahub.com
  ```
- Password:
  ```
  123456
  ```

### Installation
Below Provided step-by-step instructions on how to install and set up your project locally.
Include any prerequisites, such as Node.js and MongoDB versions. For example:

##### project installation setup
- Clone the repository: `git clone https://github.com/Abhithakur7080/pizzahub.git`
- Navigate to the project directory: `cd pizzahub`
- Install dependencies: `npm install` or `npm i`
  
##### MongoDB setup
- visit: `https://account.mongodb.com/account/login`
- After logged in create new project
- set up by connect with the database url

##### laravel-mix setup
- visit `https://laravel-mix.com/`
- Read and follow and install the dependency in your project
- complete the setup
- also complete watch for laravel mix setup
  
##### stripe setup
- visit: `https://stripe.com`
- register or login yourself
- Read documentation carefully
- Get and set up you private and public key

##### Set up environment variables: `.env` variables
``` dotenv
PORT= your running port

# for mongo database
DB_URL = your_databa_seurl

# session cookie secret key
COOKIE_SECRET = your_secret

# stripe private key
STRIPE_PRIVATE_KEY = your_stripe_private_key
```
  

### Usage
On using this server command it:
``` bash
# run the server
npm run dev
```
### Pages
###### Homepage
- Endpoint(GET): `/`
  
![Homepage-1](https://github.com/Abhithakur7080/pizzahub/assets/119639453/fa33d8c5-a1e4-40c9-87e3-36fcd2305cb1)
![Homepage-2](https://github.com/Abhithakur7080/pizzahub/assets/119639453/1ab59714-be82-42f0-bf0a-3fb97b1fa03e)

<hr/>

###### Cartpage
- Endpoint(GET): `/cart`
- Endpoint(POST): `/update-carts`
  
![Empty-Cart](https://github.com/Abhithakur7080/pizzahub/assets/119639453/4176e014-95ff-4fb0-b22f-b22beffd2de9)
![Itemed-cart](https://github.com/Abhithakur7080/pizzahub/assets/119639453/7942e265-d37d-44da-b700-7031462198ea)

- payment options - `Cash on delivery`, `Pay with card`
  
![COD](https://github.com/Abhithakur7080/pizzahub/assets/119639453/a7176474-f451-4787-bc0e-609abd45dd83)
![Card](https://github.com/Abhithakur7080/pizzahub/assets/119639453/df3b866a-c700-41e7-80cc-3953f168997a)

<hr/>

##### Authentication
###### Register
- Endpoint(GET): `/register`
- Endpoint(POST): `/register`

  ![Register](https://github.com/Abhithakur7080/pizzahub/assets/119639453/6f8848dd-c232-4f6f-95e3-7ded11b05eb2)

###### Login
- Endpoint(GET): `/login`
- Endpoint(POST): `/login`
- 
![Login](https://github.com/Abhithakur7080/pizzahub/assets/119639453/91a9f15a-fe40-43dc-ad5f-1b746aa556b7)

<hr/>

##### Customer side
###### Orderpage
- Endpoint(GET): `/orders`
- Endpoint(POST): `/customers/orders`
  
![orderpage](https://github.com/Abhithakur7080/pizzahub/assets/119639453/998dc09b-9351-4f2a-a765-8438d79a4fb0)

- Endpoint(GET): `/customers/orders/:id`
  
![Screenshot 2024-06-06 200632](https://github.com/Abhithakur7080/pizzahub/assets/119639453/4699ddce-e958-4268-b98a-a6825b157cc8)

<hr/>

##### Admin side
###### Orders handler page
- Endpoint(GET): `/admin/orders`
- Endpoint(POST): `/admin/order/status`

![Orders_handling_page](https://github.com/Abhithakur7080/pizzahub/assets/119639453/5e70ff96-5217-4a88-adea-c1fab687b27d)

## Contributing
Join us in building! Fork our repository, make changes, and submit pull requests. We value community contributions and appreciate your help in improving our project.

## Contact
If you have any questions or suggestions regarding this project, feel free to contact us at [abhijeetthakur7080@gmail.com](mailto:abhijeetthakur7080@gmail.com).
