const winston = require("winston");
const mkdirp = require('mkdirp');
const colors = require('colors');

colors.enabled = true;

logger = {
    crit: (msg, data) => {
        logData = {
            message: msg,
            data: data,
            level: "crit"
        };
        logging[logData.level](logData.message, logData.data);
    },
    error: (msg, data) => {
        logData = {
            message: msg,
            data: data,
            level: "err"
        };
        logging[logData.level](logData.message, logData.data);
    },
    warn: (msg, data) => {
        logData = {
            message: msg,
            data: data,
            level: "warn"
        };
        logging[logData.level](logData.message, logData.data);
    },
    info: (msg, data) => {
        logData = {
            message: msg,
            data: data,
            level: "info"
        };
        logging[logData.level](logData.message, logData.data);
    },
    log: (msg, data) => {
        logData = {
            message: msg,
            data: data,
            level: "logging"
        };
        logging[logData.level](logData.message, logData.data);
    },
    debug: (msg, data) => {
        logData = {
            message: msg,
            data: data,
            level: "debug"
        };
        logging[logData.level](logData.message, logData.data);
    },
    verbose: (msg, data) => {
        logData = {
            message: msg,
            data: data,
            level: "verbose"
        };
        logging[logData.level](logData.message, logData.data);
    }
};

mkdirp(__dirname + '/../logs', function (err) {
    if (err) {
        winston.error(`A critical error has occurred pre-boot. The StaffHub instance failed to log the error to log files.\n${err.name}\n${err.message}\nStaffHub can not continue boot.`)
    }
});

const logLevels = {
    levels: {
        crit: 0,
        err: 1,
        warn: 2,
        info: 3,
        logging: 4,
        debug: 5,
        verbose: 6
    },
    colors: {
        crit: "red",
        err: "red",
        warn: "yellow",
        info: "white",
        logging: "white",
        debug: "gray",
        verbose: "gray"
    }
};

var logging = new (winston.Logger)({
    exitOnError: false,
    colors: logLevels.colors,
    levels: logLevels.levels,
    transports: [
        new (winston.transports.Console)({
            name: "console",
            timestamp: () => {
                return new Date().toUTCString()
            },

            formatter: function (options) {

                if (options.level == "crit") {
                    return (`(${options.timestamp()}) (${"CRITICAL".bgRed})` + ` ${options.message ? options.message : "Unknown Critical Error Occurred"}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "").red}` + `\n\t\tStaffHub can not continue and will shutdown.`).bold;
                } else {
                    return `(${options.timestamp()}) (${options.level == "err" ? "ERROR".red : options.level.toUpperCase()[logLevels.colors[options.level]]})` + ` ${(options.message ? options.message : "No message Specified")}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}`.gray
                }
            },
            colorize: true,
            level: "info"
        }),
        new (winston.transports.File)({
            name: "file-info",
            timestamp: () => {
                return new Date().toUTCString()
            },
            formatter: function (options) {

                if (options.level == "crit") {
                    return (`(${options.timestamp()}) (${"CRITICAL"})` + ` ${options.message ? options.message : "Unknown Critical Error Occurred"}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}` + `\n\t\tStaffHub can not continue and will shutdown.`);
                } else {
                    return `(${options.timestamp()}) (${options.level == "err" ? "ERROR" : options.level.toUpperCase()})` + ` ${(options.message ? options.message : "No message Specified")}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}`
                }
            },
            filename: __dirname + "/../logs/err-info.log",
            colorize: false,
            level: "info",
            maxsize: 10 * 1024 * 1024,
            tailable: true,
            json: false
        }),
        new (winston.transports.File)({
            name: "file-verbose",
            timestamp: () => {
                return new Date().toUTCString()
            },
            formatter: function (options) {

                if (options.level == "crit") {
                    return (`(${options.timestamp()}) (${"CRITICAL"})` + ` ${options.message ? options.message : "Unknown Critical Error Occurred"}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}` + `\n\t\tStaffHub can not continue and will shutdown.`);
                } else {
                    return `(${options.timestamp()}) (${options.level == "err" ? "ERROR" : options.level.toUpperCase()})` + ` ${(options.message ? options.message : "No message Specified")}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}`
                }
            },
            filename: __dirname + "/../logs/verbose.log",
            colorize: false,
            level: "verbose",
            maxsize: 10 * 1024 * 1024,
            tailable: true
        })
    ]
});
if (process.argv[2] == "DEBUG") {
    logging.add(
        new (winston.transports.File)({
            name: "file-exceptions",
            timestamp: () => {
                return new Date().toUTCString()
            },
            formatter: function (options) {
                
                if (options.level == "crit") {
                    return (`(${options.timestamp()}) (${"CRITICAL"})` + ` ${options.message ? options.message : "Unknown Critical Error Occurred"}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}` + `\n\t\tStaffHub can not continue and will shutdown.`);
                } else {
                    return `(${options.timestamp()}) (${options.level == "err" ? "ERROR" : options.level.toUpperCase()})` + ` ${(options.message ? options.message : "No message Specified")}` + `${(options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "")}`
                }
            },
            filename: __dirname + "/../logs/exceptions.log",
            colorize: false,
            level: "crit",
            maxsize: 10 * 1024 * 1024,
            tailable: true,
            handleExceptions: true,
            humanReadableUnhandledException: true
        })
    )
}
logging.on('error', function (err) {
    logging.error("An error occurred while attempting to log a message.", {err_n: err.name, err_m: err.message})
});

winston.addColors(logLevels.colors);

module.exports = logger;