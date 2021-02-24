var Prismic = require('prismic-javascript');

var apiEndpoint = "https://fanduel-casino.cdn.prismic.io/api/v2";
 
const initApi = (req) => {
    return Prismic.getApi(apiEndpoint, {
        req: req
      });
}

const getZones = async (req) => {
    process.stdout.write(`Reading from --> ${apiEndpoint}\n`);   
    try {
        const api = await initApi(req);
        const zones = await api.query(
            Prismic.Predicates.at('document.type', 'zone'),
            //Prismic.Predicates.any('my.zone.lang', ['en-us']),
            { pageSize : 100 }
        );

        zones.results.forEach(zone => {
            console.log(zone.data)
        });
        //return zones;

    } catch(e) {
        console.log("getZones: ", e);
    }
    
}

(async () => {
    const zones = await getZones();

    console.log(zones)

})();





