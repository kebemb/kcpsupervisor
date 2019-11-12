module.exports = (app) => {
    const supervisorclassrooms = require('../controllers/supervisorclassroom.controller.js');

    // Create a new supervisorclassroom
    app.post('/supervisorclassrooms', supervisorclassrooms.create);

    // Retrieve all supervisorclassrooms
    app.get('/supervisorclassrooms', supervisorclassrooms.findAll);

    // Retrieve a single supervisorclassroom with supervisorclassroomId
    app.get('/supervisorclassrooms/:supervisorclassroomId', supervisorclassrooms.findOne);

    // Update a supervisorclassroom with supervisorclassroomId
    app.put('/supervisorclassrooms/:supervisorclassroomId', supervisorclassrooms.update);

    // Delete a supervisorclassroom with supervisorclassroomId
    app.delete('/supervisorclassrooms/:supervisorclassroomId', supervisorclassrooms.delete);
}