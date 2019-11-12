const _Attributionbook = require('../models/attributionbook.model.js');

// Create and Save a new attributionbook
exports.create = (req, res) => {
    // Validate request
    if(!req.body.studentId||!req.body.collectionId||!req.body.startDate||!req.body.endDate) {
        console.log("infos attributionbook incompletes")
        return res.status(400).send({
            message: "attributionbook ne peut etre nul"
        });
    }

    // Create a attributionbook
    const attributionbook_ = new _Attributionbook({
        studentId: req.body.studentId,
        collectionId: req.body.collectionId, 
        startDate: req.body.startDate,
        endDate: req.body.endDate


    });

    // Save attributionbook in the database
    attributionbook_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l attributionbook."
        });
    });
};

// Retrieve and return all attributionbooks from the database.
exports.findAll = (req, res) => {
    _Attributionbook.find()
    .then(attributionbooks => {
        res.send(attributionbooks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de attributionbooks."
        });
    });
};

// Find a single attributionbook with a attributionbookId
exports.findOne = (req, res) => {
    _Attributionbook.findById(req.params.attributionbookId)
    .then(attributionbook => {
        if(!attributionbook) {
            return res.status(404).send({
                message: "Aucun attributionbook a cette identifiant " + req.params.attributionbookId
            });            
        }
        res.send(attributionbook);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun attributionbook a cette identifiant" + req.params.attributionbookId
            });                
        }
        return res.status(500).send({
            message: "Aucun attributionbook a cette identifiant " + req.params.attributionbookId
        });
    });
};

// Update a attributionbook identified by the attributionbookId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.studentId||!req.body.collectionId||!req.body.startDate||!req.body.endDate) {
        console.log("infos attributionbook incompletes")
        return res.status(400).send({
            message: "attributionbook ne peut etre nul"
        });
    }

    // Find attributionbook and update it with the request body
    _Attributionbook.findByIdAndUpdate(req.params.attributionbookId, {
        studentId: req.body.studentId,
        collectionId: req.body.collectionId, 
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }, {new: true})
    .then(attributionbook => {
        if(!attributionbook) {
            return res.status(404).send({
                message: "Aucun attributionbook a cette identifiant " + req.params.attributionbookId
            });
        }
        res.send(attributionbook);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun attributionbook a cette identifiant " + req.params.attributionbookId
            });                
        }
        return res.status(500).send({
            message: "Error updating attributionbook with id " + req.params.attributionbookId
        });
    });
};

// Delete a attributionbook with the specified attributionbookId in the request
exports.delete = (req, res) => {
    _Attributionbook.findByIdAndRemove(req.params.attributionbookId)
    .then(attributionbook => {
        if(!attributionbook) {
            return res.status(404).send({
                message: "Aucun attributionbook a cette identifiant " + req.params.attributionbookId
            });
        }
        res.send({message: "attributionbook supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun attributionbook a cette identifiant " + req.params.attributionbookId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un attributionbook avec cet indentifiant " + req.params.attributionbookId
        });
    });
};