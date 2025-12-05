let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    var aggregateQuery = Assignment.aggregate();
    Assignment.aggregatePaginate(
        aggregateQuery,
        { page: req.query.page || 1, limit: req.query.limit || 10 },
        (err, assignments) => {
            if(err){
                return res.send(err);
            }
            res.send(assignments);
        }
    );
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){
            return res.send(err);
        }
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.name = req.body.name;
    assignment.dueDate = req.body.dueDate;
    assignment.completed = req.body.completed;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            return res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.name} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        res.json({message: 'updated'});

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    let assignmentId = req.params._id;
    Assignment.findOneAndDelete({id: assignmentId}, (err, assignment) => {
        if (err) {
            return res.send(err);
        }
        if (!assignment) {
            return res.status(404).json({message: 'Assignment not found'});
        }
        res.json({message: `${assignment.name} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
