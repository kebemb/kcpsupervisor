const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
// create express app
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Configuring the database


mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
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
    res.json({"message": "Welcome to lmks application."});
});
// adding routes
require('./app/routes/student.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/classroom.routes.js')(app);
require('./app/routes/room.routes.js')(app);
require('./app/routes/studentfolder.routes.js')(app);
require('./app/routes/professor.routes.js')(app);
require('./app/routes/censor.routes.js')(app);
require('./app/routes/intendant.routes.js')(app);
require('./app/routes/principal.routes.js')(app);
require('./app/routes/librarian.routes.js')(app);
require('./app/routes/supervisor.routes.js')(app);
require('./app/routes/collection.routes.js')(app);
require('./app/routes/course.routes.js')(app);

require('./app/routes/attributionbook.routes.js')(app);
require('./app/routes/classstudent.routes.js')(app);
require('./app/routes/roomclassroom.routes.js')(app);
require('./app/routes/supervisorclassroom.routes.js')(app);


// listen for requests
app.listen(3000, () => {
    console.log('API server started on: ' + port);
});