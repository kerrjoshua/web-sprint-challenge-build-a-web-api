const express = require('express')
const Actions = require('./actions-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.json(action)
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        customMessage: 'Double double toil and trouble in the Actions router.'
    })
})

module.exports = router;
