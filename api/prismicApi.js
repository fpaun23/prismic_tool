var Prismic = require('prismic-javascript');
const PrismicConfig = require('./prismic-configuration');

function initApi(req, repo = "fanduel_dev") {  
    return Prismic.getApi(PrismicConfig.prismicSource[repo], {
      req: req
    });
  }
module.exports = {
    initApi,
};
