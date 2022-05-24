![AudioBookApp](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653316791/Report/MainPageFrontend_wyglob.jpg)
## First Step 

To run the project, we have to download a zip file from the GitHub repository which contain all of the web application files
![GitHubStep1](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653314819/Report/GitHub_Step1_rxby41.jpg)

After we downloaded the project we need to unpack to any location on our disk drive. We need to install ["NodeJS"](https://nodejs.org/en/download/) on our computer
and choose a correct version.

## Second Step

In the Visual Studio Code we need to open the project containing all of the files. After loading successfully to Visual Studio we should install all dependencies for frontend and backend that are located in package.json files .

In root /backend and /frontend we need to run in terminal :
```javascript
npm install
cd frontend
npm install
```
![Step2](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653315415/Report/Step2_jwjotd.jpg)

## Third Step

### .ENV variables

Next step is to create .env file including the code below
.env is located in the root folder and includes DATABASE_URI for mongo database online. where username and login is admin.


```javascript
NODE_ENV = development
DATABASE_URI= mongodb+srv://admin:admin@cluster0.8tm77.mongodb.net/E-BookShop?retryWrites=true&w=majority
PORT = 5000
JWT_SECRET = abc123
PAYPAL_CLIENT_ID =AS39RJrcSs2n7YPi2I7lKorhqhm8q7n1B-pkvc4jepbYwzGy16j6DOVv8JoNNMiSoWjA1q35QdHb7e5-
```

![.envFile](https://res.cloudinary.com/dwc3fiaro/image/upload/v1653315669/Report/.ENV_file_tcw59l.jpg)


# Running project in development mode

To run frontend : (running on port : 3000)
```
npm run client
```

To run backend : (running on port: 5000)
```
npm run server
```
To run backend and fronend 
```
npm run dev
```
To run backend and frontend in the same time I created script in package.json 
```javascript
"dev": "concurrently \"npm run server\" \"npm run client\"",
```

# Running project in production mode
We need to create build for production typing
```
npm run build
```       
in /frontend


In .env file we need to change from 
```javascript
NODE_ENV = development
```
to :
```javascript
NODE_ENV = production
```




## Backend modules
I use ECMAScript Modules for backed to covert common JS to import JS. for example in server.js instead of using 
```javascript
const express = require('express)
``` 
I can use 
```javascript
import express from 'express'
```

The only thing we have to remember is to add .js when we importing files, not packages .
In order to use that module I added in root folder package.json,  line
```javascript
"type": "module"
```
[ECMA Moodule](https://nodejs.org/api/esm.html), [https://nodejs.org/api/packages.html]













# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
