module.exports = (app) => {
    const courses = require('../controllers/course.controller.js');

    // Create a new courses
    app.post('/courses', courses.create);

    // Retrieve all courses
    app.get('/courses', courses.findAll);

    // Retrieve a single courses with coursesId
    app.get('/courses/:courseId', courses.findOne);

    // Update a courses with coursesId
    app.put('/courses/:courseId', courses.update);

    // Delete a courses with coursesId
    app.delete('/courses/:courseId', courses.delete);
}