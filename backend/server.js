const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config() 
var cron = require('node-cron');
const kcpSupervisorsControllers = require('./app/controllers/kcpSupervisors.controller.js');


// create express app
const app = express();
const port = process.env.PORT || 3000;
// ask permission
app.use(cors());
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: POST,GET,PUT,DELETE
// Access-Control-Allow-Headers: Authorization, Lang
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Configuring the database


mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:27017/${process.env.MONGODB_DATABASE}?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.get('/', (req, res) => {
    res.json({"message": "Hello!!!."});
});
// adding routes
require('./app/routes/kcpSupervisors.routes.js')(app);

cron.schedule('* 1 * * *', () => {
    kcpSupervisorsControllers.processOkFiles()
    console.log('running a task every minute');
  });

// listen for requests
app.listen(3000, () => {
    console.log('API server started on: ' + port);
});