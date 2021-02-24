
const constants = require('../constants');

const filter = (providers) => {
    return providers.filter(p => constants.PROVIDERS.includes(p.data.name[0].text));    
}

const getIds = (providers) => {    
    return providers.map(p => p.id)        
}

module.exports = {
    filter,
    getIds
};