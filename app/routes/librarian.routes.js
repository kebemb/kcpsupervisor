module.exports = (app) => {
    const librarians = require('../controllers/librarian.controller.js');

    // Create a new librarians
    app.post('/librarians', librarians.create);

    // Retrieve all librarians
    app.get('/librarians', librarians.findAll);

    // Retrieve a single librarians with librariansId
    app.get('/librarians/:librarianId', librarians.findOne);

    // Update a librarians with librariansId
    app.put('/librarians/:librarianId', librarians.update);

    // Delete a librarians with librariansId
    app.delete('/librarians/:librarianId', librarians.delete);
}