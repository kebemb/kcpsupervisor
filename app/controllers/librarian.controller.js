const _Librarian = require('../models/librarian.model.js');

// Create and Save a new librarian
exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstName||!req.body.lastName||!req.body.gender||!req.body.userId) {
        console.log("infos librarian incompletes")
        return res.status(400).send({
            message: "librarian ne peut etre nul"
        });
    }

    // Create a librarian
    const librarian_ = new _Librarian({
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        gender: req.body.gender,
        userId: req.body.userId, 
        image: req.body.image,

    });

    // Save librarian in the database
    librarian_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l librarian."
        });
    });
};

// Retrieve and return all librarians from the database.
exports.findAll = (req, res) => {
    _Librarian.find()
    .then(librarians => {
        res.send(librarians);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de librarians."
        });
    });
};

// Find a single librarian with a librarianId
exports.findOne = (req, res) => {
    _Librarian.findById(req.params.librarianId)
    .then(librarian => {
        if(!librarian) {
            return res.status(404).send({
                message: "Aucun librarian a cette identifiant " + req.params.librarianId
            });            
        }
        res.send(librarian);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun librarian a cette identifiant" + req.params.librarianId
            });                
        }
        return res.status(500).send({
            message: "Aucun librarian a cette identifiant " + req.params.librarianId
        });
    });
};

// Update a librarian identified by the librarianId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.firstName||!req.body.lastName||!req.body.gender||!req.body.userId) {
        console.log("infos librarian incompletes")
        return res.status(400).send({
            message: "librarian ne peut etre nul"
        });
    }

    // Find librarian and update it with the request body
    _Librarian.findByIdAndUpdate(req.params.librarianId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName, 
        gender: req.body.gender,
        userId: req.body.userId, 
        image: req.body.image,
    }, {new: true})
    .then(librarian => {
        if(!librarian) {
            return res.status(404).send({
                message: "Aucun librarian a cette identifiant " + req.params.librarianId
            });
        }
        res.send(librarian);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun librarian a cette identifiant " + req.params.librarianId
            });                
        }
        return res.status(500).send({
            message: "Error updating librarian with id " + req.params.librarianId
        });
    });
};

// Delete a librarian with the specified librarianId in the request
exports.delete = (req, res) => {
    _Librarian.findByIdAndRemove(req.params.librarianId)
    .then(librarian => {
        if(!librarian) {
            return res.status(404).send({
                message: "Aucun librarian a cette identifiant " + req.params.librarianId
            });
        }
        res.send({message: "librarian supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun librarian a cette identifiant " + req.params.librarianId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un librarian avec cet indentifiant " + req.params.librarianId
        });
    });
};