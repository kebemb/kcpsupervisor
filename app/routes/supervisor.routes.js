module.exports = (app) => {
    const supervisors = require('../controllers/supervisor.controller.js');

    // Create a new supervisors
    app.post('/supervisors', supervisors.create);

    // Retrieve all supervisors
    app.get('/supervisors', supervisors.findAll);

    // Retrieve a single supervisors with supervisorsId
    app.get('/supervisors/:supervisorId', supervisors.findOne);

    // Update a supervisors with supervisorsId
    app.put('/supervisors/:supervisorId', supervisors.update);

    // Delete a supervisors with supervisorsId
    app.delete('/supervisors/:supervisorId', supervisors.delete);
}