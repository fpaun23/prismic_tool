import React from 'react'

export const DisplayBoard = ({csvFile, handleDownload}) => {
    
    return(
        <div className="display-board">
            <h4>CSV file:</h4>
            <div className="number">
            {csvFile}
            </div>
            <div className="btn">
                <button type="button" onClick={(e) => handleDownload()} className="btn btn-warning">Download</button>
            </div>
        </div>
    )
}