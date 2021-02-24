const fs = require('fs');

const saveHomepagesJson = (hps, lang = "en-us") => {
    //console.log(categories);
    const timestamp = Date.now();    
    fs.mkdir("exports/" + timestamp , { recursive: true }, (err) => {
        if (err) throw err;
    });

    console.log("Archive your folder with the following command --> curl http://localhost:3000/zip -d folder=" + timestamp);
    console.log("Creating export folder --> exports/" + timestamp)
    console.log("Creating categories json files...")

    hps.forEach(hp => {
                
        preparedData = prepareData(hp.data);
        //console.log("preparedData:", preparedData);
        let data = JSON.stringify(
            {
                ...preparedData, 
                ...{
                    //"id": category.id, 
                    "type" : hp.type, 
                    "uid" : hp.uid, 
                    lang: lang 
                }
            }
        ); 
        
        fs.writeFile("exports/" + timestamp + '/' + hp.uid +'.json', data, (err) => {
            if (err) throw err;
            console.log('  --> ', hp.uid +'.json');            
        }); 
    });

    return timestamp;

}

const prepareData = (exportData) => {  
    
    let name = {};
    let zones = {};
    
    const deletes = [       
        //"name",
        //"zones",
    ]

    const defaults = {}

    if (exportData.hasOwnProperty('name')) {        

        name = prepareNameField(exportData.name, 'name');        
    }

    
    if (exportData.hasOwnProperty('zones')) {        

        zones = prepareWioUrl(exportData.zones, 'zones');        
    }      

    const preparedData = {         
        ...defaults,
        ...name,
        ...zones,
    }    
    
    //delete the unnecessary fields
    
    deletes.forEach(field => {
        if (preparedData.hasOwnProperty(field)) {
            delete preparedData[field];
        }
    })    

    return preparedData;

}

const prepareNameField = (name, key) => {

    if (Array.isArray(name) && name.length > 0) { 
      
        let nameObj = {};
        let content = {};

        content.text = name[0].text;
        content.spans = name[0].spans;
        nameObj.type = name[0].type;
        nameObj.content = content;    
        
        return { [key] : [nameObj] }
    }

    return {}
}

const prepareWioUrl = (field, key) => {    
    
    if (Array.isArray(field)) {

        if (field.length > 0) {
            let arr = [];     

            field.forEach(f => {                
                const kys = Object.keys(f)[0];            
                if (f[kys].hasOwnProperty('id')) {                
                    arr.push(
                        {
                        [kys]: {
                            "id": f[kys].id,
                            "wioUrl": "wio://documents/" + f[kys].id
                            }
                        }
                    )
                }                                
            })

            return { [key] : arr }
        } else {
            return { [key] : [{}] }
        }
        /*
        switch (key) {

            case "categories":                
                field.forEach(f => {                                     
                    if (f.category.hasOwnProperty('id')) {
                        arr.push(
                            {
                                "category": {
                                "id": f.category.id,
                                "wioUrl": "wio://documents/" + f.category.id
                                }
                            }
                        )
                    }                    
                    
                })
                return { "categories" : arr }
            break;           
            
        }
        */
        //return arr;
    } else {

        if (field != null && field.hasOwnProperty('id')) {
            return { 
               [key]: {
                    "id" : field.id,
                    "wioUrl": "wio://documents/" + field.id
                }
            }
        }
        return { [key]: null }           
    }
}

module.exports = {
    saveHomepagesJson      
};
