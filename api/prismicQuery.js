const Prismic = require('prismic-javascript');
const PrismicConfig = require('./prismic-configuration');
const prismicApi = require('./prismicApi');
const utilsProviders = require('./utils/providers');

//curl -v --header "Content-Type: application/json" http://localhost:3000/

const prismicSource = PrismicConfig.prismicSource;

const getAll  = async (req) => {
    process.stdout.write(`getAll data from ${prismicSource}\n`);  

    try {

        let arrResult = [];
        let queryPromises = [];
        let page = 1;

        const api = await prismicApi.initApi(req);

        const result = await api.query(
            Prismic.Predicates.at('document.type', 'game'),
            { pageSize : 1, page: page,  orderings : '[document.first_publication_date]' },
        );  

        arrResult.push(result.results);
                
        const totalPages = result.total_pages;

        if (totalPages > 1) {
            for(let i = 2; i <= totalPages; i++) {
                queryPromises.push(
                    api.query(
                        Prismic.Predicates.at('document.type', 'game'),
                        { pageSize : 100, page: i, orderings : '[document.first_publication_date]'  },
                        
                    )
                )       
            }
        }

        if (queryPromises.length > 0) {
            for(let i = 0; i < queryPromises.length; i++) {
                const res = await queryPromises[i];
                arrResult.push(res.results);                
            }
        }

        let games = [];

        for(let i = 0; i < arrResult.length; i++) {
           games = games.concat(arrResult[i]);
        }
                
        return games;
    } catch(e) {
        console.log('getAll:', e)
    }
}

const getProviders = async (req, repo = "fanduel_dev") => {
    process.stdout.write(`Reading from --> ${prismicSource[repo]}\n`);   
    try {
        const api = await prismicApi.initApi(req, repo);
        const providers = await api.query(
            Prismic.Predicates.at('document.type', 'provider'),
            { pageSize : 100 }
        );

        return providers;

    } catch(e) {
        console.log("getProviders: ", e);
    }
}

const getProducts = async (req, localeFrom = "", localeTo = "", repo = "fanduel_dev") => {

    let lang = "*";
    if (localeFrom.length > 0) {                
        lang = localeFrom;
    }

    try {
        const api = await prismicApi.initApi(req, repo);
        const products = await api.query(
            Prismic.Predicates.at('document.type', 'product'),
            { pageSize : 100, lang: lang }
        );
                    
        return products;

    } catch(e) {
        console.log("getProducts: ", e);
    }
}

const getCategories = async (req, localeFrom = "", localeTo = "", repo = "fanduel_dev") => {
    process.stdout.write(`Reading from --> ${prismicSource[repo]}\n`);

    let lang = "*";
    if (localeFrom.length > 0) {                
        lang = localeFrom;
    }

    try {
        const api = await prismicApi.initApi(req, repo);
        const categories = await api.query(
            Prismic.Predicates.at('document.type', 'category'),
            { pageSize : 100, lang: lang }
        );
          
        //console.log(categories.results.data)
        return categories;

    } catch(e) {
        console.log("getCategories: ", e);
    }
}

const getGamesByProvider  = async (req, providers = [], localeFrom = "", localeTo = "", repo = "fanduel_dev") => {
    process.stdout.write(`Reading from --> ${prismicSource[repo]}\n`);
    
    console.log("repo:", repo);
    console.log("localeFrom:", localeFrom.toString())
    console.log("localeTo:", localeTo.toString())
    

    let lang = "*";
    if (localeFrom.length > 0) {                
        lang = localeFrom;
    }
    
    console.log(lang)
    console.log(providers)
    
    try {
        const api = await prismicApi.initApi(req, repo);    
        //let filteredProvidersIds = [];    
        //const providers = await getProviders(req);        
        
        //const filteredProviders = utilsProviders.filter(providers.results);
        //const filteredProvidersIds = utilsProviders.getIds(filteredProviders);

        //console.log("filteredProvidersIds:", filteredProvidersIds);
        
        const result = await api.query(
            //Prismic.Predicates.at('document.type', 'game'),
            //Prismic.Predicates.at('my.game.provider', "X84g_RIAACcAtqiO"),
            Prismic.Predicates.any('my.game.provider', providers),
            { pageSize : 2, orderings : '[document.first_publication_date desc]', lang: lang }
            //{ pageSize : 100, page: 2 }
        );

        return result;            

    } catch(e) {
        console.log('getGamesByProvider:', e)
    }
    
}

const getHomepage = async (req) => {
    try {
        const api = await prismicApi.initApi(req);
        
        api.getByUID('zone', 'table-zone', {'fetchLinks': 'game.cayetano'} )
            .then(function(document) {
            console.log(document.data.body[0].items);
        });
        
        
        /*
        const hps = await api.query(
            Prismic.Predicates.at('document.type', 'zone'),            
        );
        */
        console.log(hps)
        //return hps;

    } catch(e) {
        console.log("getHomepage: ", e);
    }
}

const getZones = async (req, localeFrom = "", localeTo = "", repo = "fanduel_dev") => {
   process.stdout.write(`Reading from --> ${prismicSource[repo]}\n`);
    
    let lang = "*";
    if (localeFrom.length > 0) {                
        lang = localeFrom;
    }

    try {
        const api = await prismicApi.initApi(req, repo);
        const zones = await api.query(
            Prismic.Predicates.at('document.type', 'zone'),
            { pageSize : 100, lang: lang }
        );
          
        //console.log(zones.results)
        return zones;

    } catch(e) {
        console.log("getZones: ", e);
    }
}

const getNavigation = async (req, localeFrom = "", localeTo = "", repo = "fanduel_dev") => {
    process.stdout.write(`Reading from --> ${prismicSource[repo]}\n`);
     
     let lang = "*";
     if (localeFrom.length > 0) {                
         lang = localeFrom;
     }
 
     try {
         const api = await prismicApi.initApi(req, repo);
         const nav = await api.query(
             Prismic.Predicates.at('document.type', 'navigation'),
             { pageSize : 100, lang: lang }
         );
         
         /*
         console.log(nav.results[0])
         console.log("*******************")
         console.log(nav.results[0].data)
         console.log("*******************")
         */
         return nav;
 
     } catch(e) {
         console.log("getZones: ", e);
     }
 }

 const getHomepages = async (req, localeFrom = "", localeTo = "", repo = "fanduel_dev") => {
    process.stdout.write(`Reading from --> ${prismicSource[repo]}\n`);
     
     let lang = "*";
     if (localeFrom.length > 0) {                
         lang = localeFrom;
     }
 
     try {
         const api = await prismicApi.initApi(req, repo);
         const hp = await api.query(
             Prismic.Predicates.at('document.type', 'homepage'),
             { pageSize : 100, lang: lang }
         );
         
     
         return hp;
 
     } catch(e) {
         console.log("getHomepages: ", e);
     }
 }


module.exports = {
    getAll,    
    getGamesByProvider,
    getProviders,
    getHomepage,
    getZones,
    getProducts,
    getCategories,
    getNavigation,
    getHomepages
};
  