module.exports = (app) => {
    const intendant = require('../controllers/intendant.controller.js');

    // Create a new intendant
    app.post('/intendant', intendant.create);

    // Retrieve all intendant
    app.get('/intendant', intendant.findAll);

    // Retrieve a single intendant with intendantId
    app.get('/intendant/:intendantId', intendant.findOne);

    // Update a intendant with intendantId
    app.put('/intendant/:intendantId', intendant.update);

    // Delete a intendant with intendantId
    app.delete('/intendant/:intendantId', intendant.delete);
}