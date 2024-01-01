


  

const development = {
    name: 'development',
    asset_path: 'assets', // Corrected the spelling of 'assets'
    db: 'mongodb+srv://rajpruthviraj1999:evqMBdoxzjcFdboZ@placement-cell.ffrytmh.mongodb.net/?retryWrites=true&w=majority',
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
        mode: 'common',
      
    },
};



module.exports = eval(process.env.NODE_ENV)==undefined ? development :eval(process.env.NODE_ENV) ;
