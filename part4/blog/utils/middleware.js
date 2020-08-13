
const jwt = require('jsonwebtoken')
const logger = require('./logger')
const { request, response } = require('express')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('Authorization')
  const token = !auth || !auth.toLowerCase().startsWith('bearer')
    ? null
    : auth.substring(7)

  request.token = token
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send( { error: 'unknown endpoint' } )
}

const errorHandler = (error, request, response, next) => {
  
  if (error.name === 'CastError') {
    return response.status(400).send( { error: 'malformatted id' } )
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).json( { error: error.message } )
  } 
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json( { error: 'invalid token' } )
  } 
  else if (error.name === 'MongoError') {
    return response.status(400).json( { error: error.message } )
  } 
  else {
    logger.error(error.name)
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}