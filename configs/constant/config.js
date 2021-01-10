let productionConfig = require('../env/production')
let developmentConfig = require('../env/development')
let stagingConfig = require('../env/staging')

module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return developmentConfig;

        case 'production':
            return productionConfig;

        case 'staging':
            return stagingConfig;

        default:
            return developmentConfig;
    }
};


