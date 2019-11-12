module.exports = (app) => {
    const principal = require('../controllers/principal.controller.js');

    // Create a new principal
    app.post('/principal', principal.create);

    // Retrieve all principal
    app.get('/principal', principal.findAll);

    // Retrieve a single principal with principalId
    app.get('/principal/:principalId', principal.findOne);

    // Update a principal with principalId
    app.put('/principal/:principalId', principal.update);

    // Delete a principal with principalId
    app.delete('/principal/:principalId', principal.delete);
}