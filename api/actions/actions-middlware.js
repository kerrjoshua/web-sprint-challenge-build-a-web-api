// add middlewares here related to actions

function checkActionBody (req, res, next) {
    const { project_id, description, notes, completed} = req.body;

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
        next({status: 400, message: 'Please be sure that your action is well-formed, including a project_id, description, notes, and completed status'})
    } else {next()}
}


module.exports = {
    checkActionBody,
}