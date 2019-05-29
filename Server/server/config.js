/*
    Basic Server configuration
*/
module.exports = {
    DBNAME: "Pidvid",
    PORT: 300,
    TOKEN_LENGTH: 300,
    SALT_LENGTH: 40,
    MAX_ERROR_LOG_SIZE_IN_BYTES: 500,
    ERROR_LOG_PATH: "./logs/error.txt",
    MAX_DEBUG_LOG_SIZE_IN_BYTES: 500,
    DEBUG_LOG_PATH: "./logs/debug.txt",
    DEBUG_LOG_ENABELD: true,
    DEBUG_TO_CONSOLE_ENABLED: true
}