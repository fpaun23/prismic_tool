const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

//create json file for each game and save
const saveGamesCSV = (result) => {

    let exportData = [];

    if (!fs.existsSync("exports_csv/betfairplaza.csv")) {
        fs.writeFile("exports_csv/betfairplaza.csv", '', function(err) {
            if(err) {
                console.log(err);
            }
            console.log("The file exports_csv/betfairplaza.csv was created!");
        });
    } else {
        console.log('File exports_csv/betfairplaza.csv already exists!')
    }
    
    console.log("Adding to export CSV --> exports_csv/betfairplaza.csv")    

    const games = result;
    games.forEach(game => {
        
        /*
        console.log("=================")
        console.log("linked_documents:", game.linked_documents)
        console.log("alternate_languages:", game.alternate_languages)
        console.log("description:", game.data.description)
        console.log("=================")
        */
        const formattedFilterGroup = objConvertorToString(game.data.filter_group, "filter_group").join();
        const formattedDescription = objConvertorToString(game.data.description, "description").join();
        exportData.push({
                            "id" : game.id, 
                            "uid" : game.uid,
                            "type" : game.type,                             
                            "game_name" : game.data.game_name.replace(/\s+/g, ' ').trim(),
                            "game_type" : game.data.game_type,
                            "provider" : game.data.provider,
                            "first_publication_date" : game.first_publication_date,
                            "last_publication_date" : game.last_publication_date,
                            "href" : game.href,
                            "tags" : game.tags.join(),
                            "slugs" : game.slugs.join(),
                            "linked_documents" : game.linked_documents,
                            "lang" : game.lang,
                            "alternate_languages" : game.alternate_languages,                            
                            "desktop_launch_id" : game.data.desktop_launch_id,
                            "mobile_launch_id" : game.data.mobile_launch_id,
                            "desktop_launch_id" : game.data.desktop_launch_id,
                            "game_type_ref" : game.data.game_type_ref,                            
                            "width" : game.data.width,
                            "height" : game.data.height,
                            "filter_group" : formattedFilterGroup,
                            "description" : formattedDescription,
                            "page" : getPage(game.data.game_type, formattedFilterGroup, formattedDescription).join(),
        });
        
    });   
    
    const csvWriter = createCsvWriter({

        path: 'exports_csv/betfairplaza.csv',
        header: [
          {id: 'id', title: 'Id'},
          {id: 'uid', title: 'Uid'},
          {id: 'type', title: 'Type'},  
          {id: 'game_name', title: 'Game Name'},        
          {id: 'game_type', title: 'Game type'},
          {id: 'provider', title: 'Provider'},
          {id: 'first_publication_date', title: 'First publication date'},
          {id: 'last_publication_date', title: 'Last Publication date'},
          {id: 'href', title: 'Href'},
          {id: 'tags', title: 'Tags'},
          {id: 'linked_documents', title: 'Linked documents'},
          {id: 'lang', title: 'Lang'},
          {id: 'alternate_languages', title: 'Alternate Languages'},          
          {id: 'desktop_launch_id', title: 'Desktop launch id'},
          {id: 'mobile_launch_id', title: 'Mobile launch id'},
          {id: 'game_type_ref', title: 'Game type ref'},                    
          {id: 'width', title: 'Width'},
          {id: 'height', title: 'Height'},
          {id: 'filter_group', title: 'Filter group'},
          {id: 'description', title: 'Description'},
          {id: 'page', title: 'Page'},
        ]
      });
                 
      
      csvWriter
        .writeRecords(exportData)
        .then(()=> console.log('The CSV file was written successfully'));        
}

const saveGamesJson = (games, lang = "en-us") => {
    
    const timestamp = Date.now();    
    fs.mkdir("exports/" + timestamp , { recursive: true }, (err) => {
        if (err) throw err;
    });

    console.log("Archive your folder with the following command --> curl http://localhost:3000/zip -d folder=" + timestamp);
    console.log("Creating export folder --> exports/" + timestamp)
    console.log("Creating games json files...")

    games.forEach(game => {
                                                          
        exportData = { ...game.data, ...{"type" : game.type, "uid" : game.uid, lang: lang }}

        preparedData = prepareData(exportData);

        let data = JSON.stringify(preparedData);        
        fs.writeFile("exports/" + timestamp + '/' + game.uid +'.json', data, (err) => {
            if (err) throw err;
            console.log('  --> ', game.uid +'.json');            
        });        
    });

    return timestamp;

}

const prepareData = (exportData) => {  
    
    let preparedName = {};
    let preparedDisplayNameField = {};
    let preparedGameWindowWidth = {}
    let preparedGameWindowHight = {}
    let preparedLogo = {}
    let preparedBackground = {}
    let preparedFlattened = {}
    let preparedScreenshots = {}

    const deletes = [
        "alternate_languages",
        "launch_date",
        "status_bar_visibility",
        "common_ui",
        "seo_meta_title",
        "seo_meta_description",
        "seo_game_description_headline",
        "seo_game_description",
        "seo_breadcrumb",
        "external_help_file_link",
        "help",
        "external_help_file_link_mobile",
        "help_mobile",
        "body",
        "jackpot_contribution",
        "custom_background_color",
        "copyright_text",
        "app",
        "tournaments_hub",
        "secondary_top_mobile_navigation_prospect",
        "secondary_bottom_mobile_navigation_prospect",
        "side_navigation_desktop_prospect",
        "promo_hub_casino_prospect",
        "prospect_recommended_games_zone_for_search",
        "prospect_pages",
        "secondary_top_mobile_navigation_logged_out",
        "secondary_bottom_mobile_navigation_logged_out",
        "side_navigation_desktop_logged_out",
        "promo_hub_casino_logged_out",
        "logged_out_recommended_games_zone_for_search",
        "logged_out_pages",
        "top_navigation_mobile_logged_in",
        "secondary_top_mobile_navigation_logged_in",
        "secondary_bottom_mobile_navigation_logged_in",
        "side_navigation_desktop_logged_in",
        "promo_hub_casino_logged_in",
        "logged_in_recommended_games_zone_for_search",
        "logged_in_pages",
        "top_navigation_mobile_vip",
        "secondary_top_mobile_navigation_vip",
        "secondary_bottom_mobile_navigation_vip",
        "side_navigation_desktop_vip",
        "promo_hub_casino_vip",
        "vip_recommended_games_zone_for_search",
        "vip_pages",
        "default_meta_description",
        "native_description"
    ]

    const defaults = {
        //"lang" : "fd-mi",
        "cayetano" : "NO",
        "html5" : "NO",
        "status_overall" : "Inactive",
        "status_desktop" : "Inactive",
        "status_mobile" : "Inactive",
        "status_native" : "Inactive",
        "dismiss_button_position" : "",
        "country_filtering" : "Provider settings",
        "countries" : [
            {}
        ],
        "currency_filtering" : "Provider settings",
        "currencies" : [
            {}
        ],
        "jackpot_logo" : "None",
        "tags" : []
    }

    if (exportData.hasOwnProperty('name')) {        

        preparedName = prepareNameField(exportData.name, 'name');        
    }

    if (exportData.hasOwnProperty('display_name')) {        

        preparedDisplayNameField = prepareNameField(exportData.display_name, 'display_name');
    }

    if (exportData.hasOwnProperty('ganid')) {        

        preparedGanid = prepareStringField(exportData.ganid, 'ganid');
    }
    
    if (exportData.hasOwnProperty('game_window_width')) {        

        preparedGameWindowWidth = prepareStringField(exportData.game_window_width, 'game_window_width');
    }

    if (exportData.hasOwnProperty('game_window_height')) {        

        preparedGameWindowHight = prepareStringField(exportData.game_window_height, 'game_window_height');
    }

    if (exportData.hasOwnProperty('logo')) {        

        preparedLogo = prepareImageField(exportData.logo, 'logo');        
    }

    if (exportData.hasOwnProperty('background')) {        

        preparedBackground = prepareImageField(exportData.background, 'background');        
    }

    if (exportData.hasOwnProperty('flattened')) {        

        preparedFlattened = prepareImageField(exportData.flattened, 'flattened');        
    }

    if (exportData.hasOwnProperty('screenshots')) {        

        preparedScreenshots = prepareImageField(exportData.screenshots, 'screenshots');        
    }

    let preparedMainProduct = {} ;

    if (exportData.hasOwnProperty('main_product')) {        

        preparedMainProduct = prepareWioUrl(exportData.main_product, 'main_product');        
    }

    let preparedProvider = {} ;

    if (exportData.hasOwnProperty('provider')) {        

        preparedProvider = prepareWioUrl(exportData.provider, 'provider');        
    }

    let preparedGameStudio = {} ;

    if (exportData.hasOwnProperty('game_studio')) {        

        preparedGameStudio = prepareWioUrl(exportData.game_studio, 'game_studio');        
    }

    let preparedGameType = {} ;

    if (exportData.hasOwnProperty('game_type')) {        

        preparedGameType = prepareWioUrl(exportData.game_type, 'game_type');        
    }

    let preparedGameTheme = {} ;

    if (exportData.hasOwnProperty('game_theme')) {        

        preparedGameTheme = prepareWioUrl(exportData.game_theme, 'game_theme');        
    }
    
    let preparedGameMechanics = {} ;

    if (exportData.hasOwnProperty('game_mechanics')) {        

        preparedGameMechanics = prepareWioUrl(exportData.game_mechanics, 'game_mechanics');        
    }

    let preparedGameRelatedGames = {} ;

    if (exportData.hasOwnProperty('related_games')) {        

        preparedGameRelatedGames = prepareWioUrl(exportData.related_games, 'related_games');        
    }

    let preparedGameGameTags = {};

    if (exportData.hasOwnProperty('game_tags')) {                
        preparedGameGameTags = prepareWioUrl(exportData.game_tags, 'game_tags');        
    }


    const preparedData = { 
        ...exportData,
        ...defaults,
        ...preparedName,
        ...preparedDisplayNameField,
        ...preparedGameWindowWidth,
        ...preparedGameWindowHight,
        ...preparedLogo,
        ...preparedBackground,
        ...preparedFlattened,
        ...preparedScreenshots,
        ...preparedMainProduct,
        ...preparedProvider,
        ...preparedGameStudio,
        ...preparedGameType,
        ...preparedGameTheme,
        ...preparedGameMechanics,
        ...preparedGameRelatedGames,
        ...preparedGameGameTags,
        ...preparedGanid
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

const prepareImageField = (field, key) => {
            
    switch (key) {
        
        case "logo" :
                    
            if (field[0].hasOwnProperty('image')) {
                
                if(field[0].image.hasOwnProperty('dimensions') && field[0].image.hasOwnProperty('url')) {
                    field[0].image["origin"] = { 
                        "id" : "",
                        "url": field[0].image.url,
                        "width" : field[0].image.dimensions.width,
                        "height": field[0].image.dimensions.height
                    }; 
                    return { "logo" : field }; 
                }                 
            } 
            return { "logo" : [] };
        

        case "background" :

            if (field[0].hasOwnProperty('image')) {
                if(field[0].image.hasOwnProperty('dimensions') && field[0].image.hasOwnProperty('url')) {
                    field[0].image["origin"] = { 
                        "id" : "",
                        "url": field[0].image.url,
                        "width" : field[0].image.dimensions.width,
                        "height": field[0].image.dimensions.height
                    };                    
                    return { "background" : field };
                }                
            } 
        return { "background" : [] };           
        
        case "flattened" :

            if (field[0].hasOwnProperty('image')) {
                if(field[0].image.hasOwnProperty('dimensions') && field[0].image.hasOwnProperty('url')) {
                    field[0].image["origin"] = { 
                        "id" : "",
                        "url": field[0].image.url,
                        "width" : field[0].image.dimensions.width,
                        "height": field[0].image.dimensions.height
                    }; 
                    return { "flattened" : field };
                }
            }         
        return { "flattened" : [] };

        case "screenshots" :

            let imgs = [];

            if (field.length > 0) {

                field.forEach(f => {

                    if (f.hasOwnProperty('screenshot')) {
                        if(f.screenshot.hasOwnProperty('dimensions') && f.screenshot.hasOwnProperty('url')) {
                            f.screenshot["origin"] = { 
                                "id" : "",
                                "url": f.screenshot.url,
                                "width" : f.screenshot.dimensions.width,
                                "height": f.screenshot.dimensions.height
                            };                
                            imgs.push( { "screenshot" : f.screenshot } );
                        }

                    }                    
                })        
            }


        return { "screenshots" : imgs };

    }

    return {};
}

const prepareStringField = (field, key) => {        
    if (null != field) {
        switch (key) {
            case "game_window_width" : return { "game_window_width" : field.toString() }
            case "game_window_height" : return { "game_window_height" : field.toString() }
            case "ganid" : return { "ganid" : field.toString() }
        }
    }
    return {};
}

const prepareWioUrl = (field, key) => {

    if (Array.isArray(field)) {             
        let arr = [];

        switch (key) {

            case "game_mechanics":                
                field.forEach(f => {
                    if (f.game_mechanic.hasOwnProperty('id')) {
                        arr.push(
                            {
                                "game_mechanic": {
                                "id": f.game_mechanic.id,
                                "wioUrl": "wio://documents/" + f.game_mechanic.id
                                }
                            }
                        )
                    }                    
                })
            return { "game_mechanics" : arr }

            case "related_games":                
                field.forEach(f => {
                    if (f.game.hasOwnProperty('id')) {
                        arr.push(
                            {
                                "game": {
                                "id": f.game.id,
                                "wioUrl": "wio://documents/" + f.game.id
                                }
                            }
                        )
                    }                    
                })
            return { "related_games" : arr }                

            case "game_tags":                
                field.forEach(f => {
                    if (f.tag.hasOwnProperty('id')) {
                        arr.push(
                            {
                                "tag": {
                                "id": f.tag.id,
                                "wioUrl": "wio://documents/" + f.tag.id
                                }
                            }
                        )   
                    }                 
                })
            return { "game_tags" : arr }                

        }

        return arr;

    } else {
        switch (key) {

            case "main_product":
                if (field.hasOwnProperty('id')) {
                    return { 
                        "main_product": {
                            "id" : field.id,
                            "wioUrl": "wio://documents/" + field.id
                        }
                    }
                }
            return { "main_product": null }    

            case "provider":
                if (field.hasOwnProperty('id')) {
                    return { 
                        "provider": {
                            "id" : field.id,
                            "wioUrl": "wio://documents/" + field.id
                        }
                    }
                }    
            return { "provider": null }

            case "game_studio":

                if (field != null && field.hasOwnProperty('id')) {
                    return { 
                        "game_studio": {
                            "id" : field.id,
                            "wioUrl": "wio://documents/" + field.id
                        }
                    }
                }
            return { "game_studio": null }                

            case "game_type":
                if (field != null && field.hasOwnProperty('id')) {
                    return { 
                        "game_type": {
                            "id" : field.id,
                            "wioUrl": "wio://documents/" + field.id
                        }
                    }
                }
            return { "game_type": null }

            case "game_theme":
                if (field != null && field.hasOwnProperty('id')) {
                    return { 
                        "game_theme": {
                            "id" : field.id,
                            "wioUrl": "wio://documents/" + field.id
                        }
                    }
                }
            return { "game_theme": null }                
        }

        return null
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

const getPage = (type, filter_group, description) => {

    const pages = getSubPages(type, filter_group, description);

    return pages;
}

const getSubPages = (type, filter_group, description) => {
    
    const allGamesSubPage = { "slot" :  "Slots/All Games", "table" : "Tables/All Games" }
    const subPages =  { 
        "Slots": {            
            "new" : "Slots/New",
            "exclusive": "Slots/Exclusive",
            "1-10lines" : "Slots/1-10 Lines",
            "15-20lines" : "Slots/15-20 Lines",
            "25+lines" : "Slots/25+ Lines",
            "featured": "Homepage/Featured",
            "jackpot": "Homepage/Jackpot Games | Jackpots", 
            "roulette": "Tables/Roulette"
        },
        "Video Poker": {
            "poker": "Video Poker",            
            "new": "Tables/New",
            "exclusive": "Tables/Exclusive",
            "blackjack": "Tables/Blackjack",
            "roulette": "Tables/Roulette"
        },
        "Blackjack": {
            "blackjack" : "Tables/Blackjack,Tables/All Games",
            "new": "Tables/New",
            "exclusive": "Tables/Exclusive",
            "featured": "Homepage/Featured"
        },
        "Roulette": {
            "roulette" : "Tables/Roulette",
            "new": "Tables/New",
            "exclusive": "Tables/Exclusive",
            "featured": "Homepage/Featured"
        },
        "Bingo and Keno": {
            "new" : "Slots/New",
            "exclusive": "Slots/Exclusive",
            "1-10lines" : "Slots/1-10 Lines",
            "15-20lines" : "Slots/15-20 Lines",
            "25+lines" : "Slots/25+ Lines",
            "featured": "Homepage/Featured",
            "jackpot": "Homepage/Jackpot Games || Jackpots", 
            "roulette": "Tables/Roulette"
        },
        "Baccarat": {
            "table": {
                "new": "Tables/New",
                "exclusive": "Tables/Exclusive",
                "featured": "Homepage/Featured",
            },
            "slot": {
                "new": "Slots/New",
                "exclusive": "Slots/Exclusive",
                "1-10lines" : "Slots/1-10 Lines",
                "15-20lines" : "Slots/15-20 Lines",
                "25+lines" : "Slots/25+ Lines",
                "featured": "Homepage/Featured",
            }
        }
    }

    if (!subPages.hasOwnProperty(type)) return [];

    let sub = subPages[type];

    if (filter_group.length > 0) {
        let subPages = filter_group.split(",");
        if (subPages.length > 0) {

            let subs = [];
            //treate this type separate
            if (type == "Baccarat") {
                let subBaccarat = sub['table'];
                if (subPages.includes("slot")) {
                    subBaccarat = sub['slot'];                    
                }   

                sub = subBaccarat;
            }

            subPages.forEach(sp => {

                if (allGamesSubPage.hasOwnProperty(sp)) subs.push(allGamesSubPage[sp]);                

                typeof sub[sp.replaceAll(' ','')] != 'undefined' ? 
                subs.push(sub[sp.replaceAll(' ','')]) :
                "";
            })
            
            //check if Live Table from description
            if (description.length > 0) {
                descriptions = description.replaceAll(' ','').split("|");                
                if (descriptions.includes("Live")) subs.push("Live Dealer")
            }

            return subs;            
        }
    }
    
    return [];
}

module.exports = {
    saveGamesJson,
    saveGamesCSV    
};
