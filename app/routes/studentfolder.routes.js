module.exports = (app) => {
    const studentfolders = require('../controllers/studentfolder.controller.js');

    // Create a new studentfolder
    app.post('/studentfolders', studentfolders.create);

    // Retrieve all studentfolders
    app.get('/studentfolders', studentfolders.findAll);

    // Retrieve a single studentfolder with studentfolderId
    app.get('/studentfolders/:studentfolderId', studentfolders.findOne);

    // Update a studentfolder with studentfolderId
    app.put('/studentfolders/:studentfolderId', studentfolders.update);

    // Delete a studentfolder with studentfolderId
    app.delete('/studentfolders/:studentfolderId', studentfolders.delete);
}