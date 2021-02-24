import React, { Component } from 'react';
import { DisplayBoardZipNoDownload } from './DisplayBoardZipNoDownload'
import GeneratePrismicContent from './GeneratePrismicContent'
import { 
  getProviders, 
  getGames, 
  getProducts, 
  makeArchive,
  getCategories,
  getZones,
  getNavigation,
  getHomepages,
  generate
} from '../services/UserService'
import About from './About';
import aboutMsg from '../texts/about';
const download = require("downloadjs");

//"proxy": "http://node-api:3080",

class DuplicateContent extends Component {

  state = { 
    zipFile: "",
    disabledGames: false,
    repo: "",
    localeFrom: "",
    localeTo: "",
    providers: [],
    selectedProviders: [],
    selectedCustomType: "",
    zipCreated: false,
    isDisabledProvidersSelect: true,    
    validate: {
      repo: false,
      customType: false,
      fromLocale: false,
      toLocale: false,
      action: false
    },
    show: {
        repo: false,
        customType: false,
        fromLocale: true,
        toLocale: true,
        providers: false,
        action: true
    }    
  }

  getProviders = async (repo) => {    
    let arrProviders = [];
    const response = await getProviders(repo);
    const providers = response.results;
    if (providers.length > 0) {
     providers.forEach(p => {       
       let pObj = { value: p.id, label: p.data.providername[0].text }
       arrProviders.push(pObj);
     });
     
     this.setState({ providers: arrProviders });
    }      
  }

  getPrismicContent = async () => {
    
    switch (this.state.action) {

      case "generate":
        this.generate();
        break;
      case "update":
        this.generate();
        break;      
      default:
        break;  

    }
  }

  getProducts = async () => {
    this.setState({ disabledGames: true });

    const response = await getProducts(this.state.localeFrom, this.state.localeTo, this.state.repo); 

    this.setState({ zipFile: response })
    this.setState({ disabledGames: false });
  }

  generate = async () => {
    this.setState({ disabledGames: true });

    const response = await generate(this.state.action, this.state.localeFrom, this.state.localeTo, this.state.repo); 

    this.setState({ zipFile: response })
    this.setState({ disabledGames: false });
  }


  getCategories = async () => {
    this.setState({ disabledGames: true });

    const response = await getCategories(this.state.localeFrom, this.state.localeTo, this.state.repo); 

    this.setState({ zipFile: response })
    this.setState({ disabledGames: false });
  }

  getZones = async () => {
    this.setState({ disabledGames: true });

    const response = await getZones(this.state.localeFrom, this.state.localeTo, this.state.repo); 

    this.setState({ zipFile: response })
    this.setState({ disabledGames: false });
  }

  getNavigation = async () => {
    this.setState({ disabledGames: true });

    const response = await getNavigation(this.state.localeFrom, this.state.localeTo, this.state.repo); 

    this.setState({ zipFile: response })
    this.setState({ disabledGames: false });
  }

  getHomepages = async () => {
    this.setState({ disabledGames: true });

    const response = await getHomepages(this.state.localeFrom, this.state.localeTo, this.state.repo); 

    this.setState({ zipFile: response })
    this.setState({ disabledGames: false });
  }

  getGames = async () => {
    this.setState({ disabledGames: true });
    
    const response = await getGames(this.state.selectedProviders, this.state.localeFrom, this.state.localeTo, this.state.repo);
    
    this.setState({ zipFile: response })    
    this.setState({ disabledGames: false });
  }

  validate = (field, status) => {

    let keys = Object.keys(this.state.validate);

    if (keys.includes(field)) {

      let obj = {};
      
      switch (field) {
        case "repo":
          obj = { repo: status }
          break;
        case "customType":
          obj = { customType: status }
          break;
        case "fromLocale":
          obj = { fromLocale: status }
          break;
        case "toLocale":
          obj = { toLocale: status }
          break;
        case "action":
            obj = { action: status }
        break;          
        default:
          break;  
      }

      this.setState({ validate: Object.assign({}, this.state.validate, {...this.state.validate, ...obj})});      
    }    
  }

  setRepo = (repo) => {
    repo.value != "" ? this.validate('repo', true) : this.validate('repo', false);
    this.setState({ repo: repo.value });
    this.getProviders(repo.value);
  }

  setAction = (action) => {
    action.value != "" ? this.validate('action', true) : this.validate('action', false);
    this.setState({ action: action.value });

    let showToLocale = true;

    switch (action.value) {      

      case "update":
        showToLocale = false;
        break;
      default:
        break;    

    }

    this.setState({ show: Object.assign({}, this.state.show, { toLocale: showToLocale })});         
    this.setState({ zipFile: "" });  
  }

  setLocaleFrom = (localeFrom) => {   
    localeFrom.value != "" ? this.validate('fromLocale', true) : this.validate('fromLocale', false);
    this.setState({ localeFrom: localeFrom.value });
  }

  setLocaleTo = (localeTo) => {
    localeTo.value != "" ? this.validate('toLocale', true) : this.validate('toLocale', false);
    this.setState({ localeTo: localeTo.value });
  }

  handleDownloadZip = async () => {
    const res = await fetch("/downloadzip?folder=" + this.state.zipFile);
    const blob = await res.blob();
    download(blob, this.state.zipFile+".zip");
    this.setState({ zipCreated: false });
    this.setState({ zipFile: "" });    
  }

  setSelectedProviders = (providers) => {
    this.setState({ selectedProviders: providers });
  }

  handleArchive = async () => {
    makeArchive('exports_bulk/locale/target');
    this.setState({ zipCreated: true });    
  }

  setSelectedCustomType = (customType) => {
    customType.value != "" ? this.validate('customType', true) : this.validate('customType', false);

    if (customType.value == "games") {
        this.setState({ isDisabledProvidersSelect: false })
    } else {
        this.setState({ isDisabledProvidersSelect: true })
    }
    this.setState({ selectedCustomType: customType.value });    
  }

  render() {
    
    return (
      <div className="App">
        <div className="container mrgnbtm">
        <About msg={aboutMsg.IMPORT_EXPORT}></About>
          <div className="row">
            <div className="col-md-8">
                <GeneratePrismicContent
                  disabled={this.state.disabledGames} 
                  getPrismicContent={this.getPrismicContent}
                  setRepo={this.setRepo}
                  setAction={this.setAction}
                  setLocaleFrom={this.setLocaleFrom}
                  setLocaleTo={this.setLocaleTo}
                  setSelectedProviders={this.setSelectedProviders}
                  setSelectedCustomType={this.setSelectedCustomType}
                  providers={this.state.providers}
                  isDisabledProvidersSelect={this.state.isDisabledProvidersSelect}
                  validate={this.state.validate}
                  show={this.state.show}                  
                >
                </GeneratePrismicContent>
            </div>
            <div className="col-md-4">
                { this.state.zipFile != "" &&
                  <DisplayBoardZipNoDownload
                    zipFile={this.state.zipFile}
                    zipCreated={this.state.zipCreated}
                    handleArchive={this.handleArchive}
                    handleDownloadZip={this.handleDownloadZip}
                  >
                  </DisplayBoardZipNoDownload>
              }
            </div>
          </div>


        </div>     
      </div>
    );
  }
}

export default DuplicateContent;
