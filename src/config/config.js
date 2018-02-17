try {
    const config = module.exports = require('./config.json');
} catch (error) {
    const sample = require('./sample.json');
    const fs = require('fs');
    const prompt = require('prompt-sync')();
    var config = {};
    var keys = [];
    for (let key in sample) {
        let responce = prompt(key + ": ");
        config[key] = responce;
    }
    fs.writeFileSync('./config/config.json', JSON.stringify(config), 'utf-8');

//    prompt.get(keys, function(err, result) {
//        for (var key in result) {
//            config[key] = result[key];
//        }
//        fs.writeFileSync('./config/config.json', JSON.stringify(config), 'utf-8');
//    });
    module.exports = config;
}
