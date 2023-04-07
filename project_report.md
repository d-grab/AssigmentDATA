# Table of Contents

1. [Title and Cover Page](#title-and-cover-page)<br>
2. [Introduction](#introduction)<br>
3. [System Overview](#system-overview)</br>
    * [Database](#database)
    * [Backend](#backend)
    * [Frontend](#frontend)        
4. [Key Design Decision](#key-design-decisions)</br>
    * [Database Design](#database-design)
    * [Backend Design](#backend-design)
    * [Frontend Design](#frontend-design)
5. [CRUD Functionality :](#crud-functionality)
    * [CREATE](#create-br)
    * [READ](#read)
    * [UPDATE](#update)  
    * [DELETE](#delete)  
6. [Security and Scalability](#securityy-and-scalability)
7. [Conlusion and Reflection](#conclusion-and-reflection)

<br><br><br><br>

## ***Introduction***
---
The project aims to provide a full-stack application with a CRUD functionality system where students can buy an audiobook relevant to programming. Most people don't have enough money to start studying at university, or they don't have enough time. My main goal was to share the audiobooks that helped me understand the basic concept of different programming languages and start programming. All audiobooks are in one place, where users can add feedback and share their comments with other people. Listening to an audiobook takes less effort and is more convenient for the average person.

---
<br><br><br>
<br><br><br><br><br><br><br>


## ***System Overview*** 
---
**Used tools**:
The general system overview is as follow: <br/>

<strong>Database:</strong></br>
- MongoDB (Atlas)

<strong>Backend:</strong></br>
- ECMAScript Module
- Node JS 
- Express</br>

<strong>Frontend :</strong></br>
- React
- Redux

<strong> IDE: </strong>
- Visual Studio Code
- Postman
- MongoDB Compass
</br>
</br></br></br></br>


 Below is the sitemap of the system:

 ![SiteMap](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653150387/Report/Diagram1_a4ywux.jpg)
 
<br><br><br><br>

---
 ### ***Database:***

 
For database connection I created a function located in folder modules called "db", to make sure the code located in store.js is clear and easy to read. In store.js I call the function ```connectDB``. I used an asynchronous function and try and catch block to find any errors. Inside the .env file, I provided a URL to connect to my Claster in Mongo Atlas. The .env file can be found on my GitHub repository in README file. 

``` javascript 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URI)
        console.log(`Connected to database: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1) }}
```
I created cluster in MongoDB Atlas where I store all my data. Three colletions store all informations about the products, users and their orders. In Atlas I created a user "admin" that has access to the database.
By setting Network access IP to : 0.0.0.0/0 , I allow to access from any devicve</br>

![Connection](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,h_309/v1652187061/Report/Network_Access_wx1osn.jpg)
![AtlasCluster](https://res.cloudinary.com/dwc3fiaro/image/upload/v1654086634/Report/DtabaseAtlasCluster_lkeuin.jpg)

![AtlasAccess](https://res.cloudinary.com/dwc3fiaro/image/upload/v1654086768/Report/AtlasAccess_up0ejf.jpg)

For images and screenshots for the report I used server called Claudinary , where I store my pictures.

![screenshot1](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,h_320,w_650/v1652185750/Report/Cloudinary_ba8vux.jpg)

---
### ***Backend:***

To communicate between database and backend I used object data mapper called Mongoose for NodeJS which make it easier by using methods for example : ``` findByID()```. My all routes for the backend are located in the folder ```/routes```. Inside are only routes pointing to controller methods. To avoid duplicate routes and typing errors I used ```router.route()``` which includes various HTTP methods like (GET,POST,PUT and DELETE).

![routes](https://res.cloudinary.com/dwc3fiaro/image/upload/c_mfit,h_128,w_442/v1652191532/Report/Routes_lp7xds.jpg)

By using this approach , I can specify only in server.js, that anynything what will go to ```/api/users``` it will be linked to ```userRoutes()```. The middleware ```app.use()``` of the requested route is called every time the request is sent to the server.

![server.js](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_551/v1652193775/Report/server.js_Routes_yfewwg.jpg)

Instead of using try catch block in every route to handle errors, I used ["express async handler middleware"](https://www.npmjs.com/package/express-async-handler) which passes all exceptions inside of async express routes to express errors handler.

The all ***CRUD*** functionality is located in folder ```/controllers``` . For example in ```/controllers/bookController.js``` we can find methods to create new book, read all books, update book, and delete a book using mongoose  :

```javascript
 - createBook()  -updateBook() -deleteBookById()
 - getBooks()    -getBookById()
```


![GetBookById](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,h_207/v1652198145/Report/Get_book_ById_ze4d1r.jpg)
<br><br><br><br>

After the function is created and exported, I call the function and assign it to the corret route in ```/routes/bookRoutes.js```.

``` javascript
import {getBookById} from '../controllers/bookController.js'
router.route('/:id').get(getBookById)
```
When the user sends HTTP request to the server, in ```/store.js``` the ```app.use()``` method is called and it will run the function. After that , the respond will be send back with requested data (json).


 In ```/data``` folder, I created sample data based on the schemas located in folder ```/models``` for books and users. It can be imported any time using seeder script in case we deleted our data, or some error occour while testing the application. 

 ![seeder](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_724/v1652194817/Report/Seeder_Users_sagczk.jpg)

 For testing the routes and the connections and HTTP requests, I  used Postman. 

![Postman](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,h_300,w_825/v1652195502/Report/Admin_Postman_fkiltf.jpg)

In ```package.json``` I added script to import and delete the users and books from ```/data``` folder.

``` javascript
"data:import": "node backend/seeder",
"data:destroy": "node backend/seeder -d",
```

To authenticate a user when we log in, we will send a POST request and find the user by matching the email and password that is encrypted in database. This functionality is located in ```/userController.js```.

![Authentication](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,h_301,w_637/v1652268757/Report/Authentication_ik8axj.jpg)

I created route in ```/userRoutes.js  :``` </br>

``` javascript
router.post('/login', authUSer)
```
To make sure the req.body can access email and password in ```/userController.js```, in ```/server.js``` I added a middleware that allows to access the json files in req.body   :

``` javascript
const app = express()
app.use(express.json())
app.use('/api/users', userRoutes)
```
---
### ***Frontend :***

For the frontend  I used UI called ["ReactBootstrap"](https://react-bootstrap.github.io/getting-started/introduction) that allows to import components like Button or Card and use them as styled React components. 
```javascript
import { Button, Card } from 'react-bootstrap'
```

To create different routes and different URLs and separate concerns in the app and makes the logic clear I used ```{BrowserRouter}``` from [React-Router-Dom](https://reactrouter.com/docs/en/v6/getting-started/installation). To use it, in ```/App.js``` I wrapped the application in the tags Router and then provide the path for each page. For example, for the Home Page , the route is ```path='/'```. The exact means that only `/` will take us to the Home page, not all of the paths.



![Rect-router-dom](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,h_338/v1652275132/Report/React-Router-Dom_vmpox4.jpg)


For building the user interface I used [React-redux](https://redux.js.org/introduction/getting-started). In ```/store.js``` I combine many different reducers where each of them is handling specific functionality. For example, for fetching books from the backend I created ```bookListReducer``` in which I specify the state for, request, success and failure. 

![bookListReducer](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,h_203/v1652277120/Report/Book_list_reducer_jvspgd.jpg)

I also use React-redux-devtools-extension for debugging and managing state and tracking actions. I used a piece of middleware called ``thunk`` to make an asynchronous request to the server. To implement the store in my application I used "Provider" from react-redux in ```/index.js```  and wrapped all applications in those tags.

```javascript
import { Provider} from 'react-redux'
import store from './store'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>)
```
![ReduxExtension](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,h_472/v1652278499/Report/Redux_extension_gmveam.jpg)

The web application is based on the same concept. First I create a reducer, where I specify the initial state (for example empty object),  and the action. Then I create a switch statement where I specify the type to evaluate that is in the action object and return this part of the state. (request,success,fail). After that, I import this function into ```/store.js``` for example to display a list of Books on the Home Page.

```javascript
import { bookListReducer} from './reducers/bookReducers'
const reducer = combineReducers({
    bookList:bookListReducer,
```

 For each cases I created a file located in ```/constans.js``` where I assign a string for each case variable.

 ```javascript
 export const  BOOK_LIST_REQUEST = 'BOOK_LIST_REQUEST'
export const  BOOK_LIST_SUCCESS = 'BOOK_LIST_SUCCESS'
export const  BOOK_LIST_FAIL = 'BOOK_LIST_FAIL'
```


---
## ***Key Design decisions :***


--- 
### ***Database design***
---
For my application, I decided to use the non-relational database MongoDB. Because I used NodeJS for my backend, I used the mongoose library for MongoDB. It provides a lot of convenience in the creation and management of data. Because the data is in .json format and stored inside the collections, I found it much easier to query the data instead of using a relational database. In my database, I created three collections (models): User, Book and Order and provided a schema for all of them, which defines how the data will be stored in the database. They are stored in ```/models``` folder. </br>

I decided to scrape the data from different sources (mainly [Audible](https://www.audible.co.uk/)) to get all details about the audiobooks. 

In the Book schema, I defined a User as a reference to see which user created a new Book. I created a separate schema for a book review - "reviewSchema" with a User as a reference, which allows every user to create a review for each book and also be a part of the book model. 

In User schema I defined boolean value "isAdmin" which identify if user is an admin. 

![UserReference](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,q_auto:eco,w_376/v1653156178/Report/BookSchemaRef_edbqop.jpg)
![ReviewSchema](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,q_auto:eco,w_376/v1653156278/Report/ReviewSchema_b39pth.jpg)
![UserSchema](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_271/v1653317496/Report/UserSchema_sl70bg.jpg)
![Compass](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653157112/Report/Compass_mwraye.jpg)

For example to get a list of users from database and use it in admin panel page ```/ListOfUsersPage``` I created a query using mongoose ```find()```. As a respond I received a list of users in .json format.

```javascript
const getAllUsers = asyncHandler(async (req,res) => {
  const users= await User.find({})
  res.json(users)})
```

![]

<br><br><br>

--- 
### ***Backend design***
---

For the backend, I decided to use Node JS and express. I also use the ECMA script module  to use the same syntax as the frontend with react. To test the backend endpoints and backend routes I used API Tool (HTTP client) called Postman. I found this tool very useful, I was able to test API's functionality without any code on the frontend site. 

I created error middleware to set a status code before we throw an error. Using this approach I can display an error in JSON format if the application is in development mode. This error middleware is run only when the error is thrown.  If that status code coming into the error handler happens to be 200, we want to return a more appropriate response to the user as to what has happened. Therefore we check whether the status code is 200, and if it is we replace it with 500 (internal server error). If the status code is not 200, we simply use whatever code that the response has already.

```javascript
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   
    res.status(statusCode);
    // Show stack trace if node environment is in development mode
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,});};
```

![ErrorMiddleware](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653395766/Report/ErrorMiddleware_lcinno.jpg)

I created sample data with users and books located in ```/backend/data``` folder, which can be imported at any time in case the actual data has been deleted or lost. To import the data I created a database seeder in ```/utils/seeder.js``` which allows to easy upload sample data. In the root folder in ```package.json``` I added scripts to run the seeder.

![SampleData](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653397090/Report/sample_data_n246hx.jpg)
![ImportSeeder](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_643/v1653397187/Report/UserSeeder_prdanf.jpg)
![DeleteSeeder](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_458/v1653397224/Report/DeleteSeeder_gbgetw.jpg)</br>

![SeederScript](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_554/v1653397424/Report/SeederPackage.json_wocf8x.jpg)



--- 
### ***Frontend design***
---

To connect distinct segments of the web page I used React Redux. For each state (constants in my project) it updates and renders accurate components when the data updates.</br>

I found react simply to use compared to other libraries like Angular or Vue. Combined bootstrap with React allowed me to create responsive interfaces and reuse the elements.

For design, I used react-bootstrap. I found it very effective and easy to understand because there are a lot of pre-design classes like ```{Button or Card}```. It makes the application design simpler and more responsive without additional CSS code. The CSS is more complex because we have to create all code from scratch.

Before creating a frontend design, I used DrawIO to create an overview of how the interface will look.
The diagrams below , representing inferface design of the home page. The books are positions on the center of diagram. This is to make sure that the books are noticed immediately to attract the user. Also the top right corner includes the menu button. This is helps to create reposnive web application and  displaying the drop down menu on mouse click. That will help the user to focus on books and create a clean view of the home page

![HomePageDesign](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_485/v1651744359/Report/Home_Page_nmdvym.jpg)</br></br></br>

The diagram below represents the register page and login page designs. Design is simple, to keep the most important fields in the centre of the page. If he already has an account, he can move to the Login page.

![RegisterDesign](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_426/v1653399750/Report/RegisterPageDesign_hxmmdy.jpg)</br>

![LoginDesign](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_426/v1653401289/Report/LoginPageDesign_btpn33.jpg)

<br><br><br><br><br><br><br><br><br><br><br>

---
### ***CRUD-Functionality:***

---
#### ***CREATE***  </br>

 The user can create a new account which allows him to add the review for the books. He can log in and add a review for the book (only registered users are able to add the reviews). 

 ![registration](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_919/v1652636584/Report/registration_ygcxyh.jpg)
 
The data is stored in the local storage as "userinfo"

``` javascript
localStorage.setItem('userInfo', JSON.stringify(data))
```
![userinfo](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652637354/Report/userinfo_ptsmpg.jpg)

The users can make orders. The checkout process has 4 stages. The first one is the register. If a user has an account already, then automatically move to the second stage which is delivery. In that step, the user adds the details for the delivery. The next step is a payment method, which is only PayPal or Credit Card. The last stage is where we can see our products from the basket we added before. I set the delivery fee to £5 if the delivery order is below £25 in ```/makeorderpage```.

``` javascript
basket.deliveryPrice= basket.itemsPrice > 25 ? 0 : 5
```
![MakingOrder](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652641331/Report/Step1_ajwgro.jpg)

Once the order is made, the user can choose payment method. For testing purposes I created [paypal-developer](https://developer.paypal.com/developer/applications/) test account, and used paypal sdk script. In ```.env``` file and provided ```PAYPAL_CLIENT_ID```. Once the order is paid , in the database the boolean value for ```isPaid``` change from False to True and from the ```/OrderPage.js``` we can see the green field with status "Paid" and the date.

![OrderPage](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652639597/Report/Order_page_xrmxkv.jpg)

![RestApiPaypal](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652639752/Report/RestAPIpaypal_sb78lh.jpg)

![AccountPaypal](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652639664/Report/paypal_zcrinp.jpg)

![AfterPayment](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652639909/Report/afterpayment_naa1pj.jpg)

![DatabaseOrder](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652640634/Report/CompassORder_ifirbk.jpg)

The admin is able to create a book from the "Edit book" page in Admin Panel by using button "Add new book". It will create a book with sample data which can be edited.

![AddNewBook](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653073838/Report/add_new_book_xo5smi.jpg)

![SampleBook](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653073938/Report/sample_book_iupu5j.jpg)




----
#### ***READ***

Once the order is placed, the users are able to see their orders from ```/ProfilePage.js```. They also can choose a Button to view the details of the order they made. The ```getOrderDetails()``` from ```/orderActions.js``` its sending request to fetch the order by orderId.

![OrderActions](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_767/v1652642547/Report/OrderActions_skylsc.jpg)

![Orders](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_1044/v1652641515/Report/ViewOrder_yodbcn.jpg)

Admin is able to see all orders that have been placed.

![AdminOrders](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653071685/Report/Admin_orders_ydgaww.jpg)

The users are able to view details of the books by action ```listBooksDetails()``` from ```/BookScreen.js```, that is sending a request to the server , to fetch the book by Id.

![BookDetails](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_752/v1652643239/Report/BookDetails_v7vnkb.jpg)

![BookDetailsPage](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652643375/Report/BookDetails2_jqkxde.jpg)


</br></br></br></br>

---
#### ***UPDATE***

The users are able to update their details (name,email,and password). The user action ```updateUserProfile()``` in ```/userActions.js``` will be called from ```/ProfilePage.js```. New values for the entered fields will be replaced by using put request. 
![UpdatedProfile](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652644815/Report/test2updated_bdjjy5.jpg)

![UpdatedProfileOrder](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652644913/Report/UpdatedDetails_wvg7br.jpg)

Admin can change the status of the order to delivered using button "Mark as delivered" from the Admin Panel page.

![AdminPanel](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653071685/Report/Admin_orders_ydgaww.jpg)
![NotDelviered](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653072412/Report/Admin_unpaid_cj0h6n.jpg)
![OrderDelivered](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653071768/Report/Admin_delvered_bwvems.jpg)

When user will add the book to the basket, he can change the quantity of the books he would like to buy.


![ChangeQuantity](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652646002/Report/UpdateQuantity_tb9mqa.jpg)

The Admin is able to edit user, change his name, email and change user to admin.

![UpdateUser](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653073347/Report/Edit_user_xpkbzy.jpg)

The admin is able to change the details of the book using "Edit Book" page by choosing favicon icon "edit". 

![EditBook](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653146833/Report/Edit_book_phjp6b.jpg)


</br></br></br></br>

---
#### ***DELETE***

Once the user will add the book to the basket, he can delete it. The action ```removeFromBasket()``` from ```/basketActions.js``` is called in ```/basketScreen.js```.  When user click on the button, the onClick() function will run the removeFromBasketHandler, and the book id will dispatched to the action. The new state ```"basketItems"``` with books (or empty) will be saved in the local storage.

![beforeDekete](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652952320/Report/deleting_xo21tc.jpg)
![removedBook](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652647604/Report/removedBook_kjddte.jpg)
![removeFromBasket](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652647790/Report/removeFromBasket_vp95ed.jpg)
![BasketActionRemove](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652648237/Report/BasketAction_fvfose.jpg)
![BasketNewState](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652648310/Report/BasketState_fy4yt4.jpg)
![LocalStorageBasket](https://res.cloudinary.com/dwc3fiaro/image/upload/v1652648410/Report/LocalStorageRemoveBasket_wdr5fv.jpg)
</br></br></br></br>

The Admin can delete a user using a favicon button remove(for "romario maya")

![BeforeDelete](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653147040/Report/Before_delete_nte0ue.jpg)

![AfterDelete](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653073057/Report/after_delete_kkjdjb.jpg)

The Admin is able to delete a book from the database using "Edit books" page from admin panel.

![AdminDeleteBook](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653148027/Report/Delete_book_ezpwmd.jpg)

![AfterDeletingBook](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653148162/Report/After_Deleting_Book_dmfhzc.jpg)
</br></br></br></br></br></br></br>

---
## ***Securityy and Scalability :***

To store the password as hashed instead of plain text in the database, I used the module ```bcryptjs```. When the user tries to log in to the account using his password, the data is sent as plain text in .json file. To compare if the text matches the password hashed in the database, I used the method ```matchPassword``` created in User model  ```/models/users.js```. 

```javascript
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)}
```

The method is called in ```/userController.js``` when we try to login and check if the user exists in the database by comparing an email and password.

![UserAuth](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_411/v1653162625/Report/UserAuth_ptmx3v.jpg)


For a user creating a new account, I build a middleware in ```/models/users.js``` that hashes the password before is saved in the database. I am using the method ```isModified()``` from mongoose to check if the user sends a request to change the password.  When the user updates their profile (for example only name), the password could be hashed again, and then the user will be not able to log in because of new hash for the same password

![RegisterEncryption](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_343/v1653163550/Report/RegisterEncryption_d7zdke.jpg)


When we have stateless APIs we can use a session to have authentication. In this project, we have 2 different projects: backend and frontend and the backend API are stateless. That is why I use Jason Web Token (jwt), not session authentication. 

When the user login to the application, it will create and assign a jwt token with a secret key to a user. The token gets sent back to the client and will be stored in the browser. I created an authorization middleware ```middleware/authMiddleware``` that allows to create protected routes. For example before  adding a review for a book we need to check if user is logged in.  To access any protected routes the token will be sent in the header. Generate token is located in ```/utils/generateToken.js```. The token expires after 30 min, and the user will have to log in again to the application.

```javascript
import jwt from 'jsonwebtoken'
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30min' })}
```

![UserToken](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653216628/Report/UserToken_ls5k6b.jpg)
![JWT.Io](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653216517/Report/JWT.io_orleat.jpg)
![UserID](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_738/v1653216909/Report/UserID_i0suuv.jpg)

To test the generated token, I used Postman and Bearer token authorization.

![PostManJWT](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653221376/Report/PostManJWT_mxyy6v.jpg)

I made my web application scalable by using MongoDB. The non-relational database allows scaling the clusters by adding more resources (increasing power of cluster) called vertical scaling. If the application will include a lot of books, users and orders In MongoDB Atlas, I can configure a cluster tier that will increase the storage and the RAM.


![ScalingAtlas](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653226137/Report/AtlasCluster_bnin8q.jpg)

Horizontal scaling is also available in MongoDB Atlas. The data is distributed across multiple sets (shards). Each of the shards contains a subset of the overall data. This approach will allow scaling beyond the server limits (like storage or RAM).

![SharedCluster](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,h_290,q_auto:best,w_418/v1653475507/Report/sharedCluster_vgy3sk.jpg)

To secure payment channel we could use SSL (Secure Socket Layer) as is the most secure protocol to use for e-commerce applications. This protocol authenticates a website's identity and enables an encrypted connection. The SSL establishes encrypted connection between the server and the browser the user use, to ensure that the data which is send between them is private and secure. The browser request a secure connection and the server sends SSL certificate and public key. The browser validates the certificate. Once is complete , the browser encrypt session key using a public key and server uses the private key to access session key. This model is not used in this application. Including an SSL certificate on website ensures that the browser no longer displays a "this website is not secure".

If the websites stores personal data like (emails, addresses, names ), they must comply with the regulations set forth by the GDPR (General Data Protection Regulation). The data privacy policy has to be clearly defined and easy to access. That can be achieved by simply adding a check box while creating an accout, that user agree on terms and privacy policy that can be access by click on the hyperlink.

The application is responsive and can be run on any device. For testing I used [Responsinator](http://www.responsinator.com/) website


***width: 375px***

![Reponsive1](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,h_299,w_188/v1654603544/Report/Reponsive1_obrgnn.jpg)

<br>

***width: 768px***

![Responsive2](https://res.cloudinary.com/dwc3fiaro/image/upload/c_scale,w_340/v1654603659/Report/Responsive2_ckhc7n.jpg)

<br>

---
## ***Conclusion and Reflection :***

In this project, I was able to achieve most of my goals. Building a full-stack web application or E-commerce website is a long process that requires a lot of debugging. My main goal was to create a full-stack web application with a user-friendly interface which will be useful for future students looking to learn programming by listening to audiobooks located in one place. I faced  problems and difficulties while creating a successful connection between the front-end and back-end and sending the API request to retrieve the data. At the end of the project, I was not able to deploy an app to Heroku. I had a lot of errors coming for the .env configuration file. I solve that issue by declaring variables in Heroku "Config Variables". By building this project, I learned a lot of new technologies like Redux and NodeJs and non-relational databases. I also learned how to develop a full-stack web application. If I will have to build this project from the beginning, I would put more effort into security. I would use SSL in my application and also consider the GDPR policies. I would add more payment methods and add more products with more details. I would use again the same technology that I used in this project.

---
<br><br><br><br><br>
