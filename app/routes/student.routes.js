module.exports = (app) => {
    const commandes = require('../controllers/commande.controller.js');

    // Create a new commande
    app.post('/commandes', commandes.create);

    // Retrieve all commandes
    app.get('/commandes', commandes.findAll);

    // Retrieve a single commande with commandeId
    app.get('/commandes/:commandeId', commandes.findOne);

    // Update a commande with commandeId
    app.put('/commandes/:commandeId', commandes.update);

    // Delete a commande with commandeId
    app.delete('/commandes/:commandeId', commandes.delete);
}