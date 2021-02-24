const fs = require('fs');

const saveProductsJson = (products, lang = "en-us") => {
    //console.log(products);
    const timestamp = Date.now();    
    fs.mkdir("exports/" + timestamp , { recursive: true }, (err) => {
        if (err) throw err;
    });

    console.log("Archive your folder with the following command --> curl http://localhost:3000/zip -d folder=" + timestamp);
    console.log("Creating export folder --> exports/" + timestamp)
    console.log("Creating products json files...")

    products.forEach(product => {
                                                          
        //exportData = { ...product.data, ...{"type" : product.type, "uid" : product.uid, lang: lang }}

        preparedData = prepareData(product.data);
        //console.log("preparedData:", preparedData);
        let data = JSON.stringify({...preparedData, ...{"type" : product.type, "uid" : product.uid, lang: lang }}); 
        //let data = JSON.stringify([]);
        fs.writeFile("exports/" + timestamp + '/' + product.uid +'.json', data, (err) => {
            if (err) throw err;
            console.log('  --> ', product.uid +'.json');            
        });        
    });

    return timestamp;

}

const prepareData = (exportData) => {  
    
    let preparedName = {};
    let preparedCategories = {};
    let preparedTop_navigation_desktop_prospect = {}
    let preparedTop_navigation_mobile_prospect = {}
    let preparedBottom_bar_mobile_prospect = {}
    let preparedProspect_recommended_games_for_search = {}
    let preparedProspect_pages = {}
    let preparedLogged_out_homepage = {}
    let preparedTop_navigation_desktop_logged_out = {}
    let preparedTop_navigation_mobile_logged_out = {}
    let preparedBottom_bar_mobile_logged_out = {}
    let preparedLogged_out_recommended_games_for_search = {}
    let preparedLogged_out_pages = {}
    let preparedLogged_in_homepage = {}
    let preparedTop_navigation_desktop_logged_in = {}
    let preparedBottom_bar_mobile_logged_in = {}
    let preparedLogged_in_recommended_games_for_search = {}
    let preparedLogged_in_pages = {}
    let preparedVip_homepage = {}
    let preparedTop_navigation_desktop_vip = {}
    let preparedBottom_bar_mobile_vip = {}
    let preparedVip_recommended_games_for_search = {}
    let preparedVip_pages = {}
    let preparedDefault_meta_title = {}
    
    const deletes = [
        //"categories",
        //"prospect_homepage",
        //"top_navigation_desktop_prospect",
        //"top_navigation_mobile_prospect",
        //"bottom_bar_mobile_prospect",
        //"prospect_recommended_games_for_search",
        //"prospect_pages",
        //"logged_out_homepage",
        //"top_navigation_desktop_logged_out",
        //"top_navigation_mobile_logged_out",
        //"bottom_bar_mobile_logged_out",
        //"logged_out_recommended_games_for_search",
        //"logged_out_pages",
        //"logged_in_homepage",
        //"top_navigation_desktop_logged_in",
        //"bottom_bar_mobile_logged_in",
        //"logged_in_recommended_games_for_search",
        //"logged_in_pages",
        //"vip_homepage",
        //"top_navigation_desktop_vip",
        //"bottom_bar_mobile_vip",
        //"vip_recommended_games_for_search",
        //"vip_pages",
        //"default_meta_title",
        "default_meta_description",
        "sitemap_hreflang",
        "maxymiser_campaigns",
        "features",        
        "tags",
        "grouplang",
        "maxymiser_campaigns",
        "promo_hub_casino_vip",
        "side_navigation_desktop_vip",
        "secondary_bottom_mobile_navigation_vip",
        "secondary_top_mobile_navigation_vip",
        "top_navigation_mobile_vip",
        "logged_in_recommended_games_zone_for_search",
        "promo_hub_casino_logged_in",
        "side_navigation_desktop_logged_in",
        "secondary_bottom_mobile_navigation_logged_in",
        "secondary_top_mobile_navigation_logged_in",
        "logged_out_recommended_games_zone_for_search",
        "promo_hub_casino_logged_out",
        "side_navigation_desktop_prospect",
        "secondary_bottom_mobile_navigation_prospect",
        "secondary_top_mobile_navigation_prospect",
        "tournaments_hub",
        "app_list",
        "app",
        "registration_promo_code",
        "3d_touch_navigation",
        "vip_recommended_games_zone_for_search",
        "promo_hub_casino_prospect",
        "prospect_recommended_games_zone_for_search",
        "logged_out_homepage_ios",
        "secondary_top_mobile_navigation_logged_out",
        "secondary_bottom_mobile_navigation_logged_out",
        "side_navigation_desktop_logged_out",
        "top_navigation_mobile_logged_in"

    ]

    const defaults = {
        //"lang" : "fd-mi",
        //"cayetano" : "NO",
        //"html5" : "NO",
        //"status_overall" : "Inactive",
        //"status_desktop" : "Inactive",
        //"status_mobile" : "Inactive",
        //"status_native" : "Inactive",
        //"dismiss_button_position" : "",
        //"country_filtering" : "Provider settings",
        //"countries" : [
        //    {}
        //],
        //"currency_filtering" : "Provider settings",
        //"currencies" : [
        //    {}
        //],
        //"jackpot_logo" : "None",
        //"tags" : []
    }

    if (exportData.hasOwnProperty('name')) {        

        preparedName = prepareNameField(exportData.name, 'name');        
    }

    if (exportData.hasOwnProperty('categories')) {        

        preparedCategories = prepareWioUrl(exportData.categories, 'categories');        
    }

    if (exportData.hasOwnProperty('prospect_homepage')) {        

        preparedProspect_homepage = prepareWioUrl(exportData.prospect_homepage, 'prospect_homepage');        
    }    
    
    if (exportData.hasOwnProperty('top_navigation_desktop_prospect')) {        

        preparedTop_navigation_desktop_prospect = prepareWioUrl(exportData.top_navigation_desktop_prospect, 'top_navigation_desktop_prospect');        
    }

    if (exportData.hasOwnProperty('top_navigation_mobile_prospect')) {        

        preparedTop_navigation_mobile_prospect = prepareWioUrl(exportData.top_navigation_mobile_prospect, 'top_navigation_mobile_prospect');        
    }
    
    if (exportData.hasOwnProperty('bottom_bar_mobile_prospect')) {        

        preparedBottom_bar_mobile_prospect = prepareWioUrl(exportData.bottom_bar_mobile_prospect, 'bottom_bar_mobile_prospect');        
    }    

    if (exportData.hasOwnProperty('prospect_recommended_games_for_search')) {        

        preparedProspect_recommended_games_for_search = prepareWioUrl(exportData.prospect_recommended_games_for_search, 'prospect_recommended_games_for_search');        
    }    

    if (exportData.hasOwnProperty('prospect_pages')) {        

        preparedProspect_pages = prepareWioUrl(exportData.prospect_pages, 'prospect_pages');        
    }  

    if (exportData.hasOwnProperty('logged_out_homepage')) {        

        preparedLogged_out_homepage = prepareWioUrl(exportData.logged_out_homepage, 'logged_out_homepage');        
    }  
    
    if (exportData.hasOwnProperty('top_navigation_desktop_logged_out')) {        

        preparedTop_navigation_desktop_logged_out = prepareWioUrl(exportData.top_navigation_desktop_logged_out, 'top_navigation_desktop_logged_out');        
    }  

    if (exportData.hasOwnProperty('top_navigation_mobile_logged_out')) {        

        preparedTop_navigation_mobile_logged_out = prepareWioUrl(exportData.top_navigation_mobile_logged_out, 'top_navigation_mobile_logged_out');        
    }  

    if (exportData.hasOwnProperty('bottom_bar_mobile_logged_out')) {        

        preparedBottom_bar_mobile_logged_out = prepareWioUrl(exportData.bottom_bar_mobile_logged_out, 'bottom_bar_mobile_logged_out');        
    }  

    if (exportData.hasOwnProperty('logged_out_recommended_games_for_search')) {        

        preparedLogged_out_recommended_games_for_search = prepareWioUrl(exportData.logged_out_recommended_games_for_search, 'logged_out_recommended_games_for_search');        
    }  

    if (exportData.hasOwnProperty('logged_out_pages')) {        

        preparedLogged_out_pages = prepareWioUrl(exportData.logged_out_pages, 'logged_out_pages');        
    }  

    if (exportData.hasOwnProperty('logged_in_homepage')) {        

        preparedLogged_in_homepage = prepareWioUrl(exportData.logged_in_homepage, 'logged_in_homepage');        
    } 
    
    if (exportData.hasOwnProperty('top_navigation_desktop_logged_in')) {        

        preparedTop_navigation_desktop_logged_in = prepareWioUrl(exportData.top_navigation_desktop_logged_in, 'top_navigation_desktop_logged_in');        
    }  

    if (exportData.hasOwnProperty('bottom_bar_mobile_logged_in')) {        

        preparedBottom_bar_mobile_logged_in = prepareWioUrl(exportData.bottom_bar_mobile_logged_in, 'bottom_bar_mobile_logged_in');        
    }  

    if (exportData.hasOwnProperty('logged_in_recommended_games_for_search')) {        

        preparedLogged_in_recommended_games_for_search = prepareWioUrl(exportData.logged_in_recommended_games_for_search, 'logged_in_recommended_games_for_search');        
    }  

    if (exportData.hasOwnProperty('logged_in_pages')) {        

        preparedLogged_in_pages = prepareWioUrl(exportData.logged_in_pages, 'logged_in_pages');        
    }  

    if (exportData.hasOwnProperty('vip_homepage')) {        

        preparedLogged_in_pages = prepareWioUrl(exportData.vip_homepage, 'vip_homepage');        
    }  

    if (exportData.hasOwnProperty('top_navigation_desktop_vip')) {        

        preparedTop_navigation_desktop_vip = prepareWioUrl(exportData.top_navigation_desktop_vip, 'top_navigation_desktop_vip');        
    }  

    if (exportData.hasOwnProperty('bottom_bar_mobile_vip')) {        

        preparedBottom_bar_mobile_vip = prepareWioUrl(exportData.bottom_bar_mobile_vip, 'bottom_bar_mobile_vip');        
    }

    if (exportData.hasOwnProperty('vip_recommended_games_for_search')) {        

        preparedVip_recommended_games_for_search = prepareWioUrl(exportData.vip_recommended_games_for_search, 'vip_recommended_games_for_search');        
    }  

    if (exportData.hasOwnProperty('vip_pages')) {        

        preparedVip_pages = prepareWioUrl(exportData.vip_pages, 'vip_pages');        
    }  

    if (exportData.hasOwnProperty('default_meta_title')) {        

        preparedDefault_meta_title = prepareStringField(exportData.default_meta_title, 'default_meta_title');        
    }  

    const preparedData = { 
        //...exportData,
        ...defaults,
        ...preparedName,
        ...preparedCategories,
        ...preparedProspect_homepage,
        ...preparedTop_navigation_desktop_prospect,
        ...preparedTop_navigation_mobile_prospect,
        ...preparedBottom_bar_mobile_prospect,
        ...preparedProspect_recommended_games_for_search,
        ...preparedProspect_pages,
        ...preparedLogged_out_homepage,
        ...preparedTop_navigation_desktop_logged_out,
        ...preparedTop_navigation_mobile_logged_out,
        ...preparedBottom_bar_mobile_logged_out,
        ...preparedLogged_out_recommended_games_for_search,
        ...preparedLogged_out_pages,
        ...preparedLogged_in_homepage,
        ...preparedTop_navigation_desktop_logged_in,
        ...preparedBottom_bar_mobile_logged_in,
        ...preparedLogged_in_recommended_games_for_search,
        ...preparedLogged_in_pages,
        ...preparedVip_homepage,
        ...preparedTop_navigation_desktop_vip,
        ...preparedBottom_bar_mobile_vip,
        ...preparedVip_recommended_games_for_search,
        ...preparedVip_pages,
        ...preparedDefault_meta_title
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
    saveProductsJson      
};
