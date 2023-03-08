const express = require('express');

function logger(req, res, next) {
    const date = new Date()
    console.log(`${req.method} request made to ${req.url} at ${date.toTimeString()}`)
    next()
  }

  module.exports = { 
    logger,
  }