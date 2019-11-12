module.exports = (app) => {
    const classrooms = require('../controllers/classroom.controller.js');

    // Create a new classroom
    app.post('/classrooms', classrooms.create);

    // Retrieve all classrooms
    app.get('/classrooms', classrooms.findAll);

    // Retrieve a single classroom with classroomId
    app.get('/classrooms/:classroomId', classrooms.findOne);

    // Update a classroom with classroomId
    app.put('/classrooms/:classroomId', classrooms.update);

    // Delete a classroom with classroomId
    app.delete('/classrooms/:classroomId', classrooms.delete);
}