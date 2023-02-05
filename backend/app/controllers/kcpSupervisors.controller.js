const _kcpSupervisor = require('../models/kcpSupervisors.model.js');
const fs = require('fs');
const path = require('path');

// Create and Save a new kcpSupervisor
exports.processOkFiles = async (req, res) => {
    // Validate request
    /*
    if(!req.body.dateNumeric||!req.body.filename||!req.body.pli_num||!req.body.pli_name) {
        console.log("infos du fichier incomplets")
        return res.status(400).send({
            message: "infos du fichier incompletes"
        });
    }
*/


const OK_SOURCE = "../../directory/"
const OK_DEST = "../../processed/"
const EXTENSION = '.txt';

const directoryPath = path.join(__dirname, OK_SOURCE);
const destinationPath = path.join(__dirname, OK_DEST);

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    if(files.length==0){
        return console.log("No file to proceed");

    }
    const targetFiles = files.filter(file => {
        return path.extname(file).toLowerCase() === EXTENSION;
    });
    //listing all files using forEach
    targetFiles.forEach(function (file) {
        // Do whatever you want to do with the file
    filedata = getFiles(OK_SOURCE+file);
    let data= filedata.split('|')
    
    // Create a kcpSupervisor
    const kcpSupervisor_ = new _kcpSupervisor({

        destination: data[0],
        subject: data[1],
        copy_email:data[2],
        index:data[3],
        doc_seq_number: data[4], 
        doc_filename: data[5],
        batch_number: data[6],
        batch_page_number: data[7],
        page_count:data[8],
        batch_date: data[9],
        file_path: data[10]
    });

    // Save kcpSupervisor in the database
    kcpSupervisor_.save()
    .then(data => {
        moveFile(directoryPath+file, destinationPath)
    }).catch(err => {
    });
    });});
res.send({
    message:"Succesfully proceced"
})
};

// Retrieve and return all kcpSupervisors from the database.
exports.findAll = (req, res) => {
    _kcpSupervisor.find()
    .then(kcpSupervisors => {
        res.send(kcpSupervisors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur lors du chargement de la liste de kcpSupervisors."
        });
    });
};

// Find a single kcpSupervisor with a kcpSupervisorId
exports.findOne = (req, res) => {
    _kcpSupervisor.findById(req.params.kcpSupervisorId)
    .then(kcpSupervisor => {
        if(!kcpSupervisor) {
            return res.status(404).send({
                message: "Aucun kcpSupervisor a cette identifiant " + req.params.kcpSupervisorId
            });            
        }
        res.send(kcpSupervisor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun kcpSupervisor a cette identifiant" + req.params.kcpSupervisorId
            });                
        }
        return res.status(500).send({
            message: "Aucun kcpSupervisor a cette identifiant " + req.params.kcpSupervisorId
        });
    });
};

// Update a kcpSupervisor identified by the kcpSupervisorId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.clientLastName||!req.body.clientFirstName||!req.body.command||!req.body.address) {
        console.log("infos kcpSupervisor incompletes")
        return res.status(400).send({
            message: "infos kcpSupervisor incompletes"
        });
    }

    // Find kcpSupervisor and update it with the request body
    _kcpSupervisor.findByIdAndUpdate(req.params.kcpSupervisorId, {
        clientFirstName: req.body.clientFirstName , 
        clientLastName: req.body.clientLastName,
        date: Date.now(),
        command: req.body.command,
        address: req.body.address
    }, {new: true})
    .then(kcpSupervisor => {
        if(!kcpSupervisor) {
            return res.status(404).send({
                message: "Aucun kcpSupervisor a cette identifiant " + req.params.kcpSupervisorId
            });
        }
        res.send(kcpSupervisor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Aucun kcpSupervisor a cette identifiant " + req.params.kcpSupervisorId
            });                
        }
        return res.status(500).send({
            message: "Error updating kcpSupervisor with id " + req.params.kcpSupervisorId
        });
    });
};

// Delete a kcpSupervisor with the specified kcpSupervisorId in the request
exports.delete = (req, res) => {
    _kcpSupervisor.findByIdAndRemove(req.params.kcpSupervisorId)
    .then(kcpSupervisor => {
        if(!kcpSupervisor) {
            return res.status(404).send({
                message: "Aucun kcpSupervisor a cette identifiant " + req.params.kcpSupervisorId
            });
        }
        res.send({message: "kcpSupervisor supprime avec succes!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Aucun kcpSupervisor a cette identifiant " + req.params.kcpSupervisorId
            });                
        }
        return res.status(500).send({
            message: "Impossible de supprimer un eleve avec cet indentifiant " + req.params.kcpSupervisorId
        });
    });
};


function getFiles(FILE_PATH){
const directoryPath = path.join(__dirname, FILE_PATH);

try {
  const data = fs.readFileSync(directoryPath, 'utf8');
  return data.split('\n')[1]
} catch (err) {
  console.error(err);
  return null;
}
};



var moveFile = (source, destination)=>{
  
    //gets source name and adds it to destination
    var f = path.basename(source);
    var dest = path.resolve(destination, f);
  
    fs.rename(source, dest, (err)=>{
      if(err) throw err;
      else console.log('Successfully moved');
    });
  };