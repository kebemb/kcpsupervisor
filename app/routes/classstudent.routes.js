module.exports = (app) => {
    const classstudents = require('../controllers/classstudent.controller.js');

    // Create a new classstudent
    app.post('/classstudents', classstudents.create);

    // Retrieve all classstudents
    app.get('/classstudents', classstudents.findAll);

    // Retrieve a single classstudent with classstudentId
    app.get('/classstudents/:classstudentId', classstudents.findOne);

    // Update a classstudent with classstudentId
    app.put('/classstudents/:classstudentId', classstudents.update);

    // Delete a classstudent with classstudentId
    app.delete('/classstudents/:classstudentId', classstudents.delete);
}