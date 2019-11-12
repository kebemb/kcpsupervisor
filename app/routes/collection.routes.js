module.exports = (app) => {
    const collections = require('../controllers/collection.controller.js');

    // Create a new collections
    app.post('/collections', collections.create);

    // Retrieve all collections
    app.get('/collections', collections.findAll);

    // Retrieve a single collections with collectionsId
    app.get('/collections/:collectionId', collections.findOne);

    // Update a collections with collectionsId
    app.put('/collections/:collectionId', collections.update);

    // Delete a collections with collectionsId
    app.delete('/collections/:collectionId', collections.delete);
}