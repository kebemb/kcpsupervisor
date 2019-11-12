module.exports = (app) => {
    const professors = require('../controllers/professor.controller.js');

    // Create a new professor
    app.post('/professors', professors.create);

    // Retrieve all professors
    app.get('/professors', professors.findAll);

    // Retrieve a single professor with professorId
    app.get('/professors/:professorId', professors.findOne);

    // Update a professor with professorId
    app.put('/professors/:professorId', professors.update);

    // Delete a professor with professorId
    app.delete('/professors/:professorId', professors.delete);
}