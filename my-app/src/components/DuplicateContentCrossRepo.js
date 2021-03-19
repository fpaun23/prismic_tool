import React, { Component } from 'react';
import { DisplayBoardZipNoDownload } from './DisplayBoardZipNoDownload'
import GeneratePrismicContent from './GeneratePrismicContent'
import {     
  makeArchive,        
  generate
} from '../services/UserService'
import About from './About';
import aboutMsg from '../texts/about';
const download = require("downloadjs");

//"proxy": "http://node-api:3080",

const actionsOptions = [
  { value: 'generate_cross_repo', label: 'Generate Cross >> from Source to Target Locale' },
  { value: 'update_cross_repo', label: 'Update Cross >> to Source Locale' },
];      

class DuplicateContentCrossRepo extends Component {

  state = { 
    zipFile: "",
    disabled: false,
    repo: "",
    localeFrom: "",
    localeTo: "",    
    zipCreated: false,    
    validate: {
      repo: false,      
      fromLocale: false,
      toLocale: false,
      action: false
    },
    show: {
        repo: true,        
        fromLocale: true,
        toLocale: true,
        providers: false,
        action: true
    }    
  }

  getPrismicContent = async () => {
    
    switch (this.state.action) {

      case "generate_cross_repo":
        this.generate();
        break;
      case "update_cross_repo":
        this.generate();
        break;      
      default:
        break;
    }
  }
 
  generate = async () => {
    this.setState({ disabled: true });

    const response = await generate(this.state.action, this.state.localeFrom, this.state.localeTo, this.state.repo); 

    this.setState({ zipFile: response })
    this.setState({ disabled: false });
  }

  validate = (field, status) => {

    let keys = Object.keys(this.state.validate);

    if (keys.includes(field)) {

      let obj = {};
      
      switch (field) {
        case "repo":
          obj = { repo: status }
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
  }

  setAction = (action) => {
    action.value != "" ? this.validate('action', true) : this.validate('action', false);
    this.setState({ action: action.value });

    let showToLocale = true;
    let showRepo = true;

    switch (action.value) {      

      case "update":
        showToLocale = false;
        showRepo = false;
        this.setState({ repo: "" })
        break;
      default:
        break;    

    }

    this.setState({ show: Object.assign({}, this.state.show, { toLocale: showToLocale,  repo: showRepo })});         
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

  handleArchive = async () => {
    makeArchive('exports_bulk/locale/target');
    this.setState({ zipCreated: true });    
  }

  render() {
    
    return (
      <div className="App">
        <div className="container mrgnbtm">
        <About msg={aboutMsg.IMPORT_EXPORT}></About>
          <div className="row">
            <div className="col-md-8">
                <GeneratePrismicContent
                  disabled={this.state.disabled} 
                  getPrismicContent={this.getPrismicContent}
                  setRepo={this.setRepo}
                  setAction={this.setAction}
                  setLocaleFrom={this.setLocaleFrom}
                  setLocaleTo={this.setLocaleTo}                                                                  
                  validate={this.state.validate}
                  show={this.state.show}
                  actionsOptions={actionsOptions}                  
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

export default DuplicateContentCrossRepo;
