var fs = require('fs');
const app = require('./config');
const express = require('express');
const PrismicConfig = require('./prismic-configuration');
const prismicQuery = require('./prismicQuery');
const utilsExport = require('./utils/export');
const utilsExportProducts = require('./utils/exportProducts');
const utilsExportCategories = require('./utils/exportCategories');
const utilsExportZones = require('./utils/exportZones');
const utilsExportNavigation = require('./utils/exportNavigation');
const utilsExportHomepages = require('./utils/exportHomepages');
const utilsExportBulk = require('./utils/exportBulk');
const utilsExportBulkCrossRepo = require('./utils/exportBulkCrossRepo');
const utilsExportSubsetCrossRepo = require('./utils/exportSubsetCrossRepo');
const zipper = require('zip-local');
const path = require('path');
const _ = require('underscore');
/*
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;
*/
// place holder for the data
const PORT = app.get('port');
const users = [];

app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/download', function(req, res){
  const file = `${__dirname}/exports_csv/betfairplaza.csv`;
  res.download(file); // Set disposition and send it.
});

app.get('/downloadzip', function(req, res){
  const file = `${__dirname}/exports/zip/${req.query.folder}.zip`;
  res.download(file); // Set disposition and send it.
});

//get games betfairplaza
app.get('/games_bp', async function (req, res) {
  const result = await prismicQuery.getAll(req);
  console.log("Total games --> ", result.length)
  utilsExport.saveGamesCSV(result);
  res.json("betfairplaza.csv");
});

app.get('/providers', async function (req, res) {
  const result = await prismicQuery.getProviders(req, req.query.repo);   
  res.json(result);
});

app.get('/games', async function (req, res) {
  
  const result = await prismicQuery.getGamesByProvider(
                                      req, 
                                      JSON.parse(req.query.providers), 
                                      req.query.localeFrom, 
                                      req.query.localeTo,
                                      req.query.repo
                );
  const gamesFolder = utilsExport.saveGamesJson(result.results, req.query.localeTo);

  res.json(gamesFolder);
});

app.get('/products', async function (req, res) {
  
  const result = await prismicQuery.getProducts(
                                      req,                                       
                                      req.query.localeFrom, 
                                      req.query.localeTo,
                                      req.query.repo
                );

  const productsFolder = utilsExportProducts.saveProductsJson(result.results, req.query.localeTo);  

  res.json(productsFolder);
});

app.get('/categories', async function (req, res) {  
  const result = await prismicQuery.getCategories(
                                      req,                                       
                                      req.query.localeFrom, 
                                      req.query.localeTo,
                                      req.query.repo
  );
  const categoriesFolder = utilsExportCategories.saveCategoriesJson(result.results, req.query.localeTo);      
  res.json(categoriesFolder);
});

app.get('/zones', async function (req, res) {  
  const result = await prismicQuery.getZones(
                                      req,                                       
                                      req.query.localeFrom, 
                                      req.query.localeTo,
                                      req.query.repo
  );

  //res.json("OK Zones")
  const zonesFolder = utilsExportZones.saveZonesJson(result.results, req.query.localeTo);      
  res.json(zonesFolder);
});

app.get('/navigation', async function (req, res) {  
  const result = await prismicQuery.getNavigation(
                                      req,                                       
                                      req.query.localeFrom, 
                                      req.query.localeTo,
                                      req.query.repo
  );
  
  const navFolder = utilsExportNavigation.saveNavigationJson(result.results, req.query.localeTo);      
  res.json(navFolder);  
});

app.get('/homepages', async function (req, res) {  
  const result = await prismicQuery.getHomepages(
                                      req,                                       
                                      req.query.localeFrom, 
                                      req.query.localeTo,
                                      req.query.repo
  );
  
  const hpsFolder = utilsExportHomepages.saveHomepagesJson(result.results, req.query.localeTo);      
  res.json(hpsFolder);    
});

app.get('/zip', async function (req, res) {
  
  
  if (typeof req.query.folder != 'undefined' && req.query.folder != "") {

    console.log('Starting archive process...');
    console.log('Creating archive folder --> ' + req.query.folder);

    zipper.zip(req.query.folder , function(error, zipped) {

        if(!error) {
            zipped.compress(); // compress before exporting
    
            var buff = zipped.memory(); // get the zipped file as a Buffer
    
            // or save the zipped file to disk
            zipped.save("exports_zip/archive.zip", function(error) {
                if(!error) {
                    console.log("Created zip archive --> exports_zip/archive.zip");
                    res.json("archive.zip");
                }
            });
        }
    });

} else {
    console.log('Invalid /zip request!');
}
});
/*
app.get('/zip', async function (req, res) {
  
  
  if (typeof cd != 'undefined' && req.query.folder != "") {

    console.log('Starting archive process...');
    console.log('Creating archive folder --> exports/zip/' + req.query.folder);

    zipper.zip("exports/" + req.query.folder , function(error, zipped) {

        if(!error) {
            zipped.compress(); // compress before exporting
    
            var buff = zipped.memory(); // get the zipped file as a Buffer
    
            // or save the zipped file to disk
            zipped.save("exports/zip/" + req.query.folder + ".zip", function(error) {
                if(!error) {
                    console.log("Created zip archive --> exports/zip/" + + req.query.folder + ".zip");
                    res.json(req.query.folder + ".zip");
                }
            });
        }
    });

} else {
    console.log('Invalid /zip request!');
}
});
*/
app.get('/generate', async function (req, res) {  
  console.log(req.query);
  if (req.query.action != "") {

    switch (req.query.action) {

      case 'generate':
          response = await utilsExportBulk.duplicateContent(req.query.localeFrom, req.query.localeTo); 
        break;
      case 'update':
          response = await utilsExportBulk.updateContent(req.query.localeFrom, req.query.localeTo); 
        break;
      case 'generate_cross_repo':
          response = await utilsExportBulkCrossRepo.duplicateContent(req.query.localeFrom, req.query.localeTo); 
        break;
      case 'update_cross_repo':
          response = await utilsExportBulkCrossRepo.updateContent(req.query.localeFrom, req.query.localeTo); 
        break;
        case 'generate_cross_repo_subset':
          response = await utilsExportSubsetCrossRepo.duplicateContent(req.query.localeFrom, req.query.localeTo, req.query.subset); 
        break;          
        case 'update_cross_repo_subset':
          response = await utilsExportSubsetCrossRepo.updateContent(req.query.localeFrom, req.query.localeTo, req.query.subset); 
      break;          
      default:
        break;    
    }

  }
  res.json("archive");    
});

//temporary - must be moved to a utility file
app.get('/subset', async function (req, res) {  

  if (req.query.localeFrom == '') { res.json([]); }

  fs.readdir('exports_subset_cross_repo/bulk', (err, files) => { 
    if (err) { 
        console.log(err);
        res.json([]);
    }
    else { 
        //console.log(files);
        let response = [];         
        let total = 0; 
        
        for (let i=0; i<files.length; i++) {
            const data = fs.readFileSync(
                'exports_subset_cross_repo/bulk/' + files[i], 
                {
                    encoding:'utf8', 
                    flag:'r'
                }); 

            const json_file = JSON.parse(data)                
            
            if (json_file.lang == req.query.localeFrom) {                
                
                if (json_file.hasOwnProperty("uid")) {
                    total++;                  
                    response.push(
                        { value: json_file.uid, label: json_file.name[0].content.text + " (" + json_file.uid + "/" + json_file.type + ")", type: json_file.type },
                    )
                }                 
            }         
        }

      const sortedObjs = _.sortBy( response, 'type' );
      res.json(sortedObjs);         
    } 
  }) 
  
});

app.get('/duplicateContent', function (req, res) {  
  utilsExportBulk.duplicateContent();  
});

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {  
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
});