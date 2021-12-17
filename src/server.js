const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const fs = require('fs')

const ON_DEATH = require('death')({uncaughtException: true})
const os = require('os')
const prod = os.hostname() == 'agilesimulations' ? true : false
const logFile = prod ? process.argv[4] : 'server.log'
const port = prod ? process.env.VUE_APP_PORT : 3016
const route =  prod ? process.env.VUE_APP_ROUTE : ''

ON_DEATH((signal, err) => {
  let logStr = new Date()
  if (signal) {
    logStr = logStr + ' ' + signal + '\n'
  }
  if (err && err.stack) {
    logStr = logStr + '  ' + err.stack + '\n'
  }
  console.log(logStr)
  //fs.appendFile(logFile, logStr, (err) => {
  //  if (err) console.log(logStr)
    process.exit()
  //})
})

global.TextEncoder = require("util").TextEncoder
global.TextDecoder = require("util").TextDecoder

let httpServer
let io
if (!prod) {
  const express = require('express')
  const app = express()
  httpServer = require('http').createServer(app)
  io = require('socket.io')(httpServer, {
    cors: {
      origins: ['http://localhost:*'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
} else {
  const options = {
    key: fs.readFileSync('/etc/ssl/private/agilesimulations.co.uk.key'),
    cert: fs.readFileSync('/etc/ssl/certs/07DDA10F5A5AB75BD9E9508BC490D32C.cer')
  }
  httpServer = require('https').createServer(options)
  io = require('socket.io')(httpServer, {
    cors: {
      origins: ['https://agilesimulations.co.uk'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
}

const dbStore = require('./store/dbStore.js')

const MongoClient = require('mongodb').MongoClient

const url = prod ?  'mongodb://127.0.0.1:27017/' : 'mongodb://localhost:27017/'
const maxIdleTime = 7200000
const connectDebugOff = prod
const debugOn = !prod

const connections = {}
const maxConnections = 2000

const emit = (event, data) => {
  if (debugOn) {
    console.log(event, data, '(emit)')
  }
  io.emit(event, data)
}

function fiveDysfunctionsEnv(db) {
  let envFile = '/usr/apps/five-dysfunctions'
  if (route) {
    envFile = envFile + '-' + route
  }
  envFile = envFile + '/.env'

  const env = fs.readFileSync(envFile, 'utf8').split(/\n/)
  for (let i = 0; i < env.length; i++) {
    const fields = env[i].split(/=/)
    const name = fields[0]
    const collection = fields[1]
    switch(name) {
      case 'VUE_APP_SERVER_COLLECTION':
        db.fiveDysfunctionsServerCollection = db.collection(collection)
        break
      case 'VUE_APP_DEPARTMENTS_COLLECTION':
        db.fiveDysfunctionsDepartmentsCollection = db.collection(collection)
        break
      case 'VUE_APP_TEAMS_COLLECTION':
        db.fiveDysfunctionsTeamsCollection = db.collection(collection)
        break
      case 'VUE_APP_QUESTION_COLLECTION':
        db.fiveDysfunctionsQuestionsCollection = db.collection(collection)
        break
      case 'VUE_APP_ASSESSMENTS_COLLECTION':
        db.fiveDysfunctionsAssessmentsCollection = db.collection(collection)
        break
    }
  }
  return db
}

function healthCheckEnv(db) {
  let envFile = '/usr/apps/team-health-check'
  if (route) {
    envFile = envFile + '-' + route
  }
  envFile = envFile + '/.env'

  const env = fs.readFileSync(envFile, 'utf8').split(/\n/)
  for (let i = 0; i < env.length; i++) {
    const fields = env[i].split(/=/)
    const name = fields[0]
    const collection = fields[1]
    switch(name) {
      case 'VUE_APP_SERVER_COLLECTION':
        db.healthCheckServerCollection = db.collection(collection)
        break
      case 'VUE_APP_DEPARTMENTS_COLLECTION':
        db.healthCheckDepartmentsCollection = db.collection(collection)
        break
      case 'VUE_APP_TEAMS_COLLECTION':
        db.healthCheckTeamsCollection = db.collection(collection)
        break
      case 'VUE_APP_QUESTION_COLLECTION':
        db.healthCheckQuestionsCollection = db.collection(collection)
        break
      case 'VUE_APP_ASSESSMENTS_COLLECTION':
        db.healthCheckAssessmentsCollection = db.collection(collection)
        break
    }
  }
  return db
}

function agileMaturityEnv(db) {
  let envFile = '/usr/apps/agile-maturity'
  if (route) {
    envFile = envFile + '-' + route
  }
  envFile = envFile + '/.env'

  const env = fs.readFileSync(envFile, 'utf8').split(/\n/)
  for (let i = 0; i < env.length; i++) {
    const fields = env[i].split(/=/)
    const name = fields[0]
    const collection = fields[1]
    switch(name) {
      case 'VUE_APP_SERVER_COLLECTION':
        db.agileMaturityServerCollection = db.collection(collection)
        break
      case 'VUE_APP_DEPARTMENTS_COLLECTION':
        db.agileMaturityDepartmentsCollection = db.collection(collection)
        break
      case 'VUE_APP_TEAMS_COLLECTION':
        db.agileMaturityTeamsCollection = db.collection(collection)
        break
      case 'VUE_APP_QUESTION_COLLECTION':
        db.agileMaturityQuestionsCollection = db.collection(collection)
        break
      case 'VUE_APP_ASSESSMENTS_COLLECTION':
        db.agileMaturityAssessmentsCollection = db.collection(collection)
        break
    }
  }
  return db
}

function scrumMasterEnv(db) {
  let envFile = '/usr/apps/scrum-master'
  if (route) {
    envFile = envFile + '-' + route
  }
  envFile = envFile + '/.env'

  const env = fs.readFileSync(envFile, 'utf8').split(/\n/)
  for (let i = 0; i < env.length; i++) {
    const fields = env[i].split(/=/)
    const name = fields[0]
    const collection = fields[1]
    switch(name) {
      case 'VUE_APP_SERVER_COLLECTION':
        db.scrumMasterServerCollection = db.collection(collection)
        break
      case 'VUE_APP_DEPARTMENTS_COLLECTION':
        db.scrumMasterDepartmentsCollection = db.collection(collection)
        break
      case 'VUE_APP_TEAMS_COLLECTION':
        db.scrumMasterTeamsCollection = db.collection(collection)
        break
      case 'VUE_APP_QUESTION_COLLECTION':
        db.scrumMasterQuestionsCollection = db.collection(collection)
        break
      case 'VUE_APP_ASSESSMENTS_COLLECTION':
        db.scrumMasterAssessmentsCollection = db.collection(collection)
        break
    }
  }
  return db
}

let db
MongoClient.connect(url, { useUnifiedTopology: true, maxIdleTimeMS: maxIdleTime }, (err, client) => {
  if (err) throw err
  db = client.db('db')

  db = fiveDysfunctionsEnv(db)
  db = healthCheckEnv(db)
  db = agileMaturityEnv(db)
  db = scrumMasterEnv(db)

  io.on('connection', (socket) => {
    const connection = socket.handshake.headers.host
    connections[connection] = connections[connection] ? connections[connection] + 1 : 1
    if (Object.keys(connections).length > maxConnections || connections[connection] > maxConnections) {
      console.log(`Too many connections. Socket ${socket.id} closed`)
      socket.disconnect(0)
    } else {
      connectDebugOff || console.log(`A user connected with socket id ${socket.id} from ${connection} - ${connections[connection]} connections. (${Object.keys(connections).length} clients)`)
      emit('updateConnections', {connections: connections, maxConnections: maxConnections})
    }

    socket.on('disconnect', () => {
      const connection = socket.handshake.headers.host
      connections[connection] = connections[connection] - 1
      connectDebugOff || console.log(`User with socket id ${socket.id} has disconnected.`)
      emit('updateConnections', {connections: connections, maxConnections: maxConnections})
    })

    socket.on('sendTestMessage', (data) => { dbStore.testMessage(db, io, data, debugOn) })

    socket.on('sendEmitMessage', (data) => { emit('emitMessage', data) })

  })
})

httpServer.listen(port, () => {
  console.log('Listening on *:' + port)
})
