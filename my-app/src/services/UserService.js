
export async function getCsv() {
    const response = await fetch('/games_bp');  
    return await response.json();
}

export async function getProviders(repo) {    
    const response = await fetch('/providers?repo=' + repo);  
    return await response.json();
}

export async function getProducts(localeFrom = "", localeTo = "", repo = "") {        
    const response = await fetch('/products?localeFrom=' + localeFrom + '&localeTo=' + localeTo + '&repo=' + repo);  
    return await response.json();
}

export async function getCategories(localeFrom = "", localeTo = "", repo = "") {        
    const response = await fetch('/categories?localeFrom=' + localeFrom + '&localeTo=' + localeTo + '&repo=' + repo);  
    return await response.json();
}

export async function getZones(localeFrom = "", localeTo = "", repo = "") {        
    const response = await fetch('/zones?localeFrom=' + localeFrom + '&localeTo=' + localeTo + '&repo=' + repo);  
    return await response.json();
}

export async function getNavigation(localeFrom = "", localeTo = "", repo = "") {        
    const response = await fetch('/navigation?localeFrom=' + localeFrom + '&localeTo=' + localeTo + '&repo=' + repo);  
    return await response.json();
}

export async function getHomepages(localeFrom = "", localeTo = "", repo = "") {        
    const response = await fetch('/homepages?localeFrom=' + localeFrom + '&localeTo=' + localeTo + '&repo=' + repo);  
    return await response.json();
}

export async function getGames(providers = [], localeFrom = "", localeTo = "", repo = "") {        
    const response = await fetch('/games?providers=' + JSON.stringify(providers) + "&localeFrom=" + localeFrom + "&localeTo=" + localeTo + "&repo=" + repo);  
    return await response.json();
}

export async function generate(action = "", localeFrom = "", localeTo = "", repo = "") {        
    const response = await fetch('/generate?action=' + action + "&localeFrom=" + localeFrom + "&localeTo=" + localeTo + "&repo=" + repo);  
    return await response.json();
}

export async function makeArchive(folder) { 
    const response = await fetch('/zip?folder=' + folder);  
    return await response.json();
}