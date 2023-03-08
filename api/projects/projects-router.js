const express = require('express')
const Projects = require('./projects-model')
const { checkProjectId, checkProjectShape } = require('./projects-middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', checkProjectId, (req, res, next) => {
    res.json(req.project)
})

router.post('/', checkProjectShape, (req, res, next) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        customMessage: 'Something smells rotten in the Projects router.'
    })
})

module.exports = router;
