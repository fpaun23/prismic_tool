const fs = require("fs-extra");
const path = require("path");
var dir = require('node-dir');

const outputFile = "output.json";



const readFolder = async () => {

  const contentFolder = path.resolve("exports");
  const dataFolders = await fs.readdirSync(contentFolder);

    console.log(dataFolders)
    console.log(contentFolder)
  
  // begin parsing each folder
  const asyncData = dataFolders.map(async (folder, i) => {
      if (folder == 'bulk') {          
        var files = dir.files(contentFolder + "/" + folder, {sync:true});
        const filenames = files.map(f => path.basename(f));
            

          for (let i=0; i<filenames.length; i++) {

            const dataFile = path.resolve(contentFolder, folder, filenames[i]); 
            const fileExists = await fs.pathExistsSync(dataFile);
           
                const jsondata = await fs.readJSONSync(dataFile);
                fs.writeJSON(contentFolder + "/en-us/" + filenames[i], jsondata).then(() => {
                    console.log("Success!");
                  });           
          }
      }
  });

  
};

module.exports = {    
    readFolder    
};