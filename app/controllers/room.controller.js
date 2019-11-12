const _Room = require('../models/room.model.js');

// Create and Save a new room
exports.create = (req, res) => {
    // Validate request
    if(!req.body.numRoom) {
        return res.status(400).send({
            message: "room ne peut etre nul"
        });
    }

    // Create a room
    const room_ = new _Room({
        numRoom: req.body.numRoom,
       

    });

    // Save room in the database
    room_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l room."
        });
    });
};

// Retrieve and return all rooms from the database.
exports.findAll = (req, res) => {
    _Room.find()
    .then(rooms => {
        res.send(rooms);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de rooms."
        });
    });
};

// Find a single room with a roomId
exports.findOne = (req, res) => {
    _Room.findById(req.params.roomId)
    .then(room => {
        if(!room) {
            return res.status(404).send({
                message: "Aucun room a cette identifiant " + req.params.roomId
            });            
        }
        res.send(room);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun room a cette identifiant" + req.params.roomId
            });                
        }
        return res.status(500).send({
            message: "Aucun room a cette identifiant " + req.params.roomId
        });
    });
};

// Update a room identified by the roomId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.numRoom) {
        console.log("infos room incompletes")
        return res.status(400).send({
            message: "room ne peut etre nul"
        });
    }

    // Find room and update it with the request body
    _Room.findByIdAndUpdate(req.params.roomId, {
        numRoom: req.body.numRoom || "Untitled room", 
        
    }, {new: true})
    .then(room => {
        if(!room) {
            return res.status(404).send({
                message: "Aucun room a cette identifiant " + req.params.roomId
            });
        }
        res.send(room);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun room a cette identifiant " + req.params.roomId
            });                
        }
        return res.status(500).send({
            message: "Error updating room with id " + req.params.roomId
        });
    });
};

// Delete a room with the specified roomId in the request
exports.delete = (req, res) => {
    _Room.findByIdAndRemove(req.params.roomId)
    .then(room => {
        if(!room) {
            return res.status(404).send({
                message: "Aucun room a cette identifiant " + req.params.roomId
            });
        }
        res.send({message: "room supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun room a cette identifiant " + req.params.roomId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un room avec cet indentifiant " + req.params.roomId
        });
    });
};