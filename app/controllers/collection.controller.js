const _Collection = require('../models/collection.model.js');

// Create and Save a new collection
exports.create = (req, res) => {
    // Validate request
    if(!req.body.collectionName||!req.body.booksCount||!req.body.collectionImage||!req.body.level) {
        console.log("infos collection incompletes")
        return res.status(400).send({
            message: "collection ne peut etre nul"
        });
    }

    // Create a collection
    const collection_ = new _Collection({
        collectionName: req.body.collectionName,
        booksCount: req.body.booksCount, 
        collectionImage: req.body.collectionImage,
        level: req.body.level

    });

    // Save collection in the database
    collection_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l collection."
        });
    });
};

// Retrieve and return all collections from the database.
exports.findAll = (req, res) => {
    _Collection.find()
    .then(collections => {
        res.send(collections);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de collections."
        });
    });
};

// Find a single collection with a collectionId
exports.findOne = (req, res) => {
    _Collection.findById(req.params.collectionId)
    .then(collection => {
        if(!collection) {
            return res.status(404).send({
                message: "Aucun collection a cette identifiant " + req.params.collectionId
            });            
        }
        res.send(collection);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun collection a cette identifiant" + req.params.collectionId
            });                
        }
        return res.status(500).send({
            message: "Aucun collection a cette identifiant " + req.params.collectionId
        });
    });
};

// Update a collection identified by the collectionId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.collectionName||!req.body.booksCount||!req.body.collectionImage||!req.body.level) {
        console.log("infos collection incompletes")
        return res.status(400).send({
            message: "collection ne peut etre nul"
        });
    }

    // Find collection and update it with the request body
    _Collection.findByIdAndUpdate(req.params.collectionId, {
        collectionName: req.body.collectionName,
        booksCount: req.body.booksCount, 
        collectionImage: req.body.collectionImage,
        level: req.body.level
    }, {new: true})
    .then(collection => {
        if(!collection) {
            return res.status(404).send({
                message: "Aucun collection a cette identifiant " + req.params.collectionId
            });
        }
        res.send(collection);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun collection a cette identifiant " + req.params.collectionId
            });                
        }
        return res.status(500).send({
            message: "Error updating collection with id " + req.params.collectionId
        });
    });
};

// Delete a collection with the specified collectionId in the request
exports.delete = (req, res) => {
    _Collection.findByIdAndRemove(req.params.collectionId)
    .then(collection => {
        if(!collection) {
            return res.status(404).send({
                message: "Aucun collection a cette identifiant " + req.params.collectionId
            });
        }
        res.send({message: "collection supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun collection a cette identifiant " + req.params.collectionId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un collection avec cet indentifiant " + req.params.collectionId
        });
    });
};