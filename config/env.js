const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

// Create a function to generate the rotating file stream
const createAccessLogStream = () => {
    const logDirectory = path.join(__dirname, '../production_logs');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    return rfs.createStream('access.log', {
        interval: '1d',
        path: logDirectory,
    });
};

const development = {
    name: 'development',
    asset_path: 'assets', // Corrected the spelling of 'assets'
    db: 'placement_cell',
    session_cookie_key: 'warthog',
    port: 8000,
    morgan: {
        mode: 'dev',
        stream: process.stdout, // Log to the console in development mode
    },
};

const production = {
    name: 'production',
    asset_path: process.env.ASSET_PATH,
    db: process.env.DB,
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
    port: process.env.PORT,
    morgan: {
        mode: 'combined',
        stream: createAccessLogStream(), // Use the rotating file stream for production
    },
};



module.exports = eval(process.env.NODE_ENV)==undefined ? development :eval(process.env.NODE_ENV) ;
