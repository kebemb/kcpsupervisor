module.exports = (app) => {
    const censor = require('../controllers/censor.controller.js');

    // Create a new censor
    app.post('/censor', censor.create);

    // Retrieve all censor
    app.get('/censor', censor.findAll);

    // Retrieve a single censor with censorId
    app.get('/censor/:censorId', censor.findOne);

    // Update a censor with censorId
    app.put('/censor/:censorId', censor.update);

    // Delete a censor with censorId
    app.delete('/censor/:censorId', censor.delete);
}