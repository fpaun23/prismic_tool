const fs = require('fs');

const saveZonesJson = (categories, lang = "en-us") => {
    //console.log(categories);
    const timestamp = Date.now();    
    fs.mkdir("exports/" + timestamp , { recursive: true }, (err) => {
        if (err) throw err;
    });

    console.log("Archive your folder with the following command --> curl http://localhost:3000/zip -d folder=" + timestamp);
    console.log("Creating export folder --> exports/" + timestamp)
    console.log("Creating categories json files...")

    categories.forEach(category => {             
        //exportData = { ...category.data, ...{"type" : category.type, "uid" : category.uid, lang: lang }}
        preparedData = prepareData(category.data);
        //console.log("preparedData:", preparedData);
        let data = JSON.stringify(
            {
                ...preparedData, 
                ...{
                    //"id": category.id, 
                    "type" : category.type, 
                    "uid" : category.uid, 
                    lang: lang 
                }
            }
        ); 
        
        fs.writeFile("exports/" + timestamp + '/' + category.uid +'.json', data, (err) => {
            if (err) throw err;
            console.log('  --> ', category.uid +'.json');            
        }); 
    });

    return timestamp;

}

const prepareData = (exportData) => {  
    
    let name = {};
    let title = {};
    let decoration = {}
    let body = {}   
    
    const deletes = [       
        //"name",
        //"title",
        //"decoration",
        //"body",        
    ]

    const defaults = {}

    if (exportData.hasOwnProperty('name')) {        

        name = prepareNameField(exportData.name, 'name');        
    }

    
    if (exportData.hasOwnProperty('title')) {        

        title = prepareNameField(exportData.title, 'title');        
    }
    
    if (exportData.hasOwnProperty('decoration')) {        

        decoration = prepareStringField(exportData.decoration, 'decoration');           
    }  
    
    if (exportData.hasOwnProperty('body')) {        
        
        body = prepareBody(exportData.body, 'body');
    }        

    const preparedData = {         
        ...defaults,
        ...name,
        ...title,
        ...decoration,
        ...body      
    }    
    
    //delete the unnecessary fields
    
    deletes.forEach(field => {
        if (preparedData.hasOwnProperty(field)) {
            delete preparedData[field];
        }
    })    

    return preparedData;

}

const prepareBody = (field, key) => {
    let arrBody = [];
    

    if (Array.isArray(field) && field.length > 0) {
        field.forEach(f => { 
            let objBody = {};

            if (f.slice_type == 'collection') {
                let itemsRepeat = {};
                let categoryNonRepeat = {};
                let nonRepeat = {};
                let valueObj = {};
                
                if (f.hasOwnProperty("items")) {               
                    itemsRepeat = prepareWioUrl(f.items, 'repeat');            
                }

                if (f.hasOwnProperty("primary")) {               
                    categoryNonRepeat = prepareWioUrl(f.primary["category"], 'category');
                    if (null != categoryNonRepeat["category"]) {
                        nonRepeat["non-repeat"] = categoryNonRepeat;
                    }
                
                }
                     
                valueObj = {...itemsRepeat, ...nonRepeat}       

                objBody.key = f.slice_type;
                objBody.value = valueObj;

                arrBody.push(objBody);
            }
        })
    }

    return { body: arrBody };
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

const prepareStringField = (field, key) => {        
    if (null != field) {
        return {[key]: field.toString()}
    }
    return {};
}

const prepareWioUrl = (field, key) => {    
    
    if (Array.isArray(field)) {

        if (field.length > 0) {
            
            let arr = [];     

            field.forEach(f => {   
                const objKeys = Object.keys(f);
                if (objKeys.length > 0) {
                    const kys = objKeys[0];                 
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
                }                              
            })

            return { [key] : arr }
        } else {
            return { [key] : [{}] }
        }
   
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

const objConvertorToString = (obj, key) => {

    if (obj.length > 0) {

        switch (key) {        
            case "filter_group":
                let filters = obj.map(f => f.filters);
            return filters;

            case "description":
                let text = obj.map(f => f.text);
            return text;

        }
    }

    return [];
}

module.exports = {
    saveZonesJson      
};
