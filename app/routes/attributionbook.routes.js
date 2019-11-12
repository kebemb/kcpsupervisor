module.exports = (app) => {
    const attributionbooks = require('../controllers/attributionbook.controller.js');

    // Create a new attributionbooks
    app.post('/attributionbooks', attributionbooks.create);

    // Retrieve all attributionbooks
    app.get('/attributionbooks', attributionbooks.findAll);

    // Retrieve a single attributionbooks with attributionbooksId
    app.get('/attributionbooks/:attributionbookId', attributionbooks.findOne);

    // Update a attributionbooks with attributionbooksId
    app.put('/attributionbooks/:attributionbookId', attributionbooks.update);

    // Delete a attributionbooks with attributionbooksId
    app.delete('/attributionbooks/:attributionbookId', attributionbooks.delete);
}