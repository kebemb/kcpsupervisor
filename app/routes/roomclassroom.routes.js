module.exports = (app) => {
    const roomclassrooms = require('../controllers/roomclassroom.controller.js');

    // Create a new roomclassroom
    app.post('/roomclassrooms', roomclassrooms.create);

    // Retrieve all roomclassrooms
    app.get('/roomclassrooms', roomclassrooms.findAll);

    // Retrieve a single roomclassroom with roomclassroomId
    app.get('/roomclassrooms/:roomclassroomId', roomclassrooms.findOne);

    // Update a roomclassroom with roomclassroomId
    app.put('/roomclassrooms/:roomclassroomId', roomclassrooms.update);

    // Delete a roomclassroom with roomclassroomId
    app.delete('/roomclassrooms/:roomclassroomId', roomclassrooms.delete);
}