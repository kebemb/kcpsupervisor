const _Commande = require('../models/commande.model.js');

// Create and Save a new commande
exports.create = (req, res) => {
    // Validate request
    if(!req.body.lastName||!req.body.firstName||!req.body.gender||!req.body.image||!req.body.birthDate||!req.body.birthAddress||!req.body.address) {
        console.log("infos commande incompletes")
        return res.status(400).send({
            message: "commande ne peut etre nul"
        });
    }

    // Create a commande
    const commande_ = new _Commande({
        firstName: req.body.firstName || "Untitled commande", 
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthAddress: req.body.birthAddress,
        birthDate: req.body.birthDate,
        image: req.body.image,
        address: req.body.address,

    });

    // Save commande in the database
    commande_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l commande."
        });
    });
};

// Retrieve and return all commandes from the database.
exports.findAll = (req, res) => {
    _Commande.find()
    .then(commandes => {
        res.send(commandes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de commandes."
        });
    });
};

// Find a single commande with a commandeId
exports.findOne = (req, res) => {
    _Commande.findById(req.params.commandeId)
    .then(commande => {
        if(!commande) {
            return res.status(404).send({
                message: "Aucun commande a cette identifiant " + req.params.commandeId
            });            
        }
        res.send(commande);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun commande a cette identifiant" + req.params.commandeId
            });                
        }
        return res.status(500).send({
            message: "Aucun commande a cette identifiant " + req.params.commandeId
        });
    });
};

// Update a commande identified by the commandeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.lastName||!req.body.firstName||!req.body.gender||!req.body.image||!req.body.birthDate||!req.body.birthAddress||!req.body.address) {
        console.log("infos commande incompletes")
        return res.status(400).send({
            message: "commande ne peut etre nul"
        });
    }

    // Find commande and update it with the request body
    _Commande.findByIdAndUpdate(req.params.commandeId, {
        firstName: req.body.firstName || "Untitled commande", 
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthAddress: req.body.birthAddress,
        birthDate: req.body.birthDate,
        image: req.body.image,
        address: req.body.address,
    }, {new: true})
    .then(commande => {
        if(!commande) {
            return res.status(404).send({
                message: "Aucun commande a cette identifiant " + req.params.commandeId
            });
        }
        res.send(commande);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun commande a cette identifiant " + req.params.commandeId
            });                
        }
        return res.status(500).send({
            message: "Error updating commande with id " + req.params.commandeId
        });
    });
};

// Delete a commande with the specified commandeId in the request
exports.delete = (req, res) => {
    _Commande.findByIdAndRemove(req.params.commandeId)
    .then(commande => {
        if(!commande) {
            return res.status(404).send({
                message: "Aucun commande a cette identifiant " + req.params.commandeId
            });
        }
        res.send({message: "commande supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun commande a cette identifiant " + req.params.commandeId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un eleve avec cet indentifiant " + req.params.commandeId
        });
    });
};