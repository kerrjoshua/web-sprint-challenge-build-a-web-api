// add middlewares here related to actions
const Actions = require('./actions-model');

function checkActionBody(req, res, next) {
    const { project_id, description, notes, completed } = req.body;

    if (
        !description ||
        typeof description !== 'string' ||
        !description.trim().length ||
        description.trim().length > 128 ||
        !notes ||
        typeof notes !== 'string' ||
        !project_id ||
        typeof project_id !== 'number' // ||
        //typeof completed !== 'boolean'
    ) {
        next({ status: 400, message: 'Please be sure that your action is well-formed, including a project_id, description, notes, and completed status' })
    } else { next() }
}

function checkActionId(req, res, next) {
    Actions.get(req.params.id)
        .then(action => {
            if (!action) {
                res.status(404).json({ message: `There is no action with ID ${req.params.id}`})
            } else {
                req.action = action;
                next();
            }
        })
        .catch(next)
}


module.exports = {
    checkActionBody,
    checkActionId,
}