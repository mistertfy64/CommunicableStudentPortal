// Stolen from Mathematical Base Defenders, another one of mistertfy64's projects.

const logLevels = {
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
    DEBUG: "debug"
};

function addMetadata(message, level) {
    let date = new Date();
    date = date.toISOString();
    let logLevel = "";

    switch (level) {
        case logLevels.ERROR: {
            logLevel = "ERROR";
            break;
        }
        case logLevels.WARNING: {
            logLevel = "WARNING";
            break;
        }
        case logLevels.INFO: {
            logLevel = "INFO";
            break;
        }
        case logLevels.DEBUG: {
            logLevel = "DEBUG";
            break;
        }
        default: {
            logLevel = "???";
            break;
        }
    }

    return "[" + date + " " + logLevel + "] " + message;
}

module.exports = {
    addMetadata
};
