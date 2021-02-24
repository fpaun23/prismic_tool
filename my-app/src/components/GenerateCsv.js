import React from 'react';
import Loader from 'react-loader-spinner';


const GenerateCsv = ({ disabled, generateCsv }) => {


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Generate games CSV</h2>
                <form>                   
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label htmlFor="exampleInputEmail1">Prismic Repo</label>
                            <input type="text" readOnly className="form-control" name="prismicrepo" id="prismicrepo" value="https://betfairplaza.prismic.io/api/v2"/>
                        </div>
                    </div>
                    {!disabled && 
                        <button type="button" disabled={disabled} onClick= {(e) => generateCsv()} className="btn btn-danger">Generate</button>
                    }
                    <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={100}                       
                        visible={disabled}
 
                  />
                </form>
                </div>
            </div>
        </div>
    )
}

export default GenerateCsv