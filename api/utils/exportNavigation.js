const fs = require('fs');

const saveNavigationJson = (navs, lang = "en-us") => {
    //console.log(categories);
    const timestamp = Date.now();    
    fs.mkdir("exports/" + timestamp , { recursive: true }, (err) => {
        if (err) throw err;
    });

    console.log("Archive your folder with the following command --> curl http://localhost:3000/zip -d folder=" + timestamp);
    console.log("Creating export folder --> exports/" + timestamp)
    console.log("Creating categories json files...")

    navs.forEach(nav => {                     
        preparedData = prepareData(nav.data);
        //console.log("preparedData:", preparedData);
        let data = JSON.stringify(
            {
                ...preparedData, 
                ...{
                    //"id": category.id, 
                    "type" : nav.type, 
                    "uid" : nav.uid, 
                    lang: lang 
                }
            }
        ); 
        
        fs.writeFile("exports/" + timestamp + '/' + nav.uid +'.json', data, (err) => {
            if (err) throw err;
            console.log('  --> ', nav.uid +'.json');            
        }); 
    });

    return timestamp;

}

const prepareData = (exportData) => {  
    
    let name = {};
    let items = {};
    
    const deletes = [       
        //"name",
        //"items",
    ]

    const defaults = {}

    if (exportData.hasOwnProperty('name')) {        

        name = prepareNameField(exportData.name, 'name');        
    }

    
    if (exportData.hasOwnProperty('items')) {        

        items = prepareWioUrl(exportData.items, 'items');        
    }      

    const preparedData = {         
        ...defaults,
        ...name,
        ...items,
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
                const objKeys = Object.keys(f);
                if (objKeys.length > 0) {                    
                    if (f.hasOwnProperty("link")) {
                        if (f["link"].hasOwnProperty("id")) {
                            arr.push(
                                {
                                "link": {
                                    "id": f["link"].id,
                                    "wioUrl": "wio://documents/" + f["link"].id
                                    },
                                "name": f.name    
                                }
                            )
                        } else {
                            if (f.hasOwnProperty("external_link")) {
                                if (f["external_link"].hasOwnProperty("url")) {
                                    arr.push(
                                        {
                                        "external_link": {                                          
                                            "url": f["external_link"].url
                                            },
                                        "name": f.name    
                                        }
                                    )
                                }        
                            } 
                        }
                    } 
                }                              
            })

            return { [key] : arr }
        } else {
            return { [key] : [{}] }
        }   
    }
}


module.exports = {
    saveNavigationJson      
};
