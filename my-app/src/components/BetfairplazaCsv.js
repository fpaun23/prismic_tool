import React, { Component } from 'react';
import { DisplayBoard } from './DisplayBoard'
import GenerateCsv from './GenerateCsv'
import { getCsv } from '../services/UserService'
const download = require("downloadjs");

//"proxy": "http://node-api:3080",

class BetfairplazaCsv extends Component {

  state = { 
    csvFile: "",    
    disabled: false,    
  }

  getCsv = async () => {
    this.setState({ disabled: true });
    const response = await getCsv();
    this.setState({ csvFile: response });
    this.setState({ disabled: false });
  }

  handleDownload = async () => {
    const res = await fetch("/download");
    const blob = await res.blob();
    download(blob, "betfairplaza.csv");
  }

  render() {
    
    return (
      <div className="App">
        <div className="container mrgnbtm">

          <div className="row">
            <div className="col-md-8">
                <GenerateCsv
                  disabled={this.state.disabled} 
                  generateCsv={this.getCsv}
                  >
                </GenerateCsv>
            </div>
            <div className="col-md-4">
                { this.state.csvFile != "" &&
                  <DisplayBoard
                    csvFile={this.state.csvFile}
                    handleDownload={this.handleDownload}
                  >
                  </DisplayBoard>
              }
            </div>
          </div>
        </div>     
      </div>
    );
  }
}

export default BetfairplazaCsv;
