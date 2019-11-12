const _Course = require('../models/course.model.js');

// Create and Save a new course
exports.create = (req, res) => {
    // Validate request
    if(!req.body.date||!req.body.professorId||!req.body.classRoomId) {
        console.log("infos course incompletes")
        return res.status(400).send({
            message: "course ne peut etre nul"
        });
    }

    // Create a course
    const course_ = new _Course({
        date: req.body.date,
        professorId: req.body.professorId, 
        classRoomId: req.body.classRoomId
       

    });

    // Save course in the database
    course_.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du ajout de l course."
        });
    });
};

// Retrieve and return all courses from the database.
exports.findAll = (req, res) => {
    _Course.find()
    .then(courses => {
        res.send(courses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de courses."
        });
    });
};

// Find a single course with a courseId
exports.findOne = (req, res) => {
    _Course.findById(req.params.courseId)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Aucun course a cette identifiant " + req.params.courseId
            });            
        }
        res.send(course);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun course a cette identifiant" + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Aucun course a cette identifiant " + req.params.courseId
        });
    });
};

// Update a course identified by the courseId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.date||!req.body.professorId||!req.body.classRoomId) {
        console.log("infos course incompletes")
        return res.status(400).send({
            message: "course ne peut etre nul"
        });
    }

    // Find course and update it with the request body
    _Course.findByIdAndUpdate(req.params.courseId, {
        date: req.body.date,
        professorId: req.body.professorId, 
        classRoomId: req.body.classRoomId
    }, {new: true})
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Aucun course a cette identifiant " + req.params.courseId
            });
        }
        res.send(course);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun course a cette identifiant " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Error updating course with id " + req.params.courseId
        });
    });
};

// Delete a course with the specified courseId in the request
exports.delete = (req, res) => {
    _Course.findByIdAndRemove(req.params.courseId)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Aucun course a cette identifiant " + req.params.courseId
            });
        }
        res.send({message: "course supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun course a cette identifiant " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un course avec cet indentifiant " + req.params.courseId
        });
    });
};