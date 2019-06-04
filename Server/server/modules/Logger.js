/*
    This File gives two methods:
        sendError(errorMessage)
            This sends an error to the error log
        sendDebug(debugMessage)
            If debugging to log is enabled it sends the debugMessage to the debug log
            If debugging to console is enabled it sends the debug message to the console
        Both methods keep track of the max log size
 */
const fs = require("fs")
const Config = require("../config")
const timestamp = require('./FunnyFunctions').timestamp

function sendError(errorMessage) {

    checkIfFileExistsAndCreate(Config.ERROR_LOG_PATH)

    try {
        let logStream = fs.createWriteStream(Config.ERROR_LOG_PATH, {'flags': 'a'})
        logStream.end(timestamp() + " => " + errorMessage + '\n')

    } catch (e) {
        console.log("Error: Can not write to " + path)
        console.log("Error Message: ")
        console.log(e)
    }

    checkLogSize(Config.ERROR_LOG_PATH, Config.MAX_ERROR_LOG_SIZE_IN_BYTES)

    if(Config.ERROR_TO_CONSOLE_ENABLED) {
        console.log(errorMessage)
    }
}

function sendDebug(debugMessage) {
    if(Config.DEBUG_LOG_ENABELD) {

        checkIfFileExistsAndCreate(Config.DEBUG_LOG_PATH)

        try {
            let logStream = fs.createWriteStream(Config.DEBUG_LOG_PATH, {'flags': 'a'})
            logStream.end(timestamp() + " => " + debugMessage + '\n')
        } catch (e) {
            console.log("Error: Can not write to " + path)
            console.log("Error Message: ")
            console.log(e)
        }

        checkLogSize(Config.DEBUG_LOG_PATH, Config.MAX_DEBUG_LOG_SIZE_IN_BYTES)
    }

    if(Config.DEBUG_TO_CONSOLE_ENABLED) {
        console.log(debugMessage)
    }
}

function checkLogSize(path, size) {
    try {
        if (fs.statSync(path).size > size) {
            let data = fs.readFileSync(path, 'utf8')
            let linesExceptFirst = data.split('\n').slice(1).join('\n')
            fs.writeFileSync(path, linesExceptFirst)

            checkLogSize(path, size)
        }
    } catch (e) {
        console.log("Error: Can AAAnot write to " + path)
        console.log("Error Message: ")
        console.log(e)
    }
}

function checkIfFileExistsAndCreate(path) {
    if (!fs.existsSync(path)) {
        let logStream = fs.createWriteStream(path, {'flags': 'a'})
        logStream.end("")
    }
}



module.exports.sendError = sendError
module.exports.sendDebug = sendDebug