const fs = require('fs');

const saveCategoriesJson = (categories, lang = "en-us") => {
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
    let display_name = {};
    let top_games = {}
    let games = {}
    let seo_meta_title = {}
    let seo_meta_description = {}
    let seo_category_description_headline = {}
    let description = {}
    let seo_links = {}
    let zones = {}
    let ssc_selected_tab = {} 
    let header_zone = {}  
    
    const deletes = [       
        //"name",
        //"display_name",
        //"top_games",
        //"games",        
        //"seo_meta_title",
        //"seo_meta_description",
        //"seo_category_description_headline",
        "description",
        "seo_links",
        "header_zone",
        //"zones",
        "ssc_selected_tab",       
    ]

    const defaults = {}

    if (exportData.hasOwnProperty('name')) {        

        name = prepareNameField(exportData.name, 'name');        
    }

    if (exportData.hasOwnProperty('display_name')) {        

        display_name = prepareNameField(exportData.display_name, 'display_name');        
    }

    if (exportData.hasOwnProperty('seo_meta_title')) {        

        seo_meta_title = prepareStringField(exportData.seo_meta_title, 'seo_meta_title');           
    }  

    if (exportData.hasOwnProperty('seo_meta_description')) {        

        seo_meta_description = prepareStringField(exportData.seo_meta_description, 'seo_meta_description');        
    }  

    if (exportData.hasOwnProperty('seo_category_description_headline')) {        

        seo_category_description_headline = prepareStringField(exportData.seo_category_description_headline, 'seo_category_description_headline');        
    }  

    if (exportData.hasOwnProperty('top_games')) {        

        top_games = prepareStringField(exportData.top_games, 'top_games');        
    }  
    
    if (exportData.hasOwnProperty('games')) {        

        games = prepareWioUrl(exportData.games, 'games');        
    }

    if (exportData.hasOwnProperty('zones')) {        
        
        zones = prepareWioUrl(exportData.zones, 'zones');        
    }

    


    const preparedData = { 
        //...exportData,
        ...defaults,
        ...name,
        ...display_name,
        ...top_games,
        ...games,
        ...seo_meta_title,
        ...seo_meta_description,
        ...seo_category_description_headline,
        ...description,
        ...seo_links,
        ...header_zone,
        ...zones,
        ...ssc_selected_tab        
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
           
    let nameObj = {};
    let content = {};

    content.text = name[0].text;
    content.spans = name[0].spans;
    nameObj.type = name[0].type;
    nameObj.content = content;    
    
    switch (key) {
        case "name" : return { "name" : [nameObj] }
        case "display_name" : return { "display_name" : [nameObj] }        
    }

    return { "name" : [nameObj] }
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
    saveCategoriesJson      
};
