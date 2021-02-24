import React from 'react'

export const DisplayBoardZip = ({zipFile, handleArchive, handleDownloadZip, zipCreated}) => {
    
    return(
        <div className="display-board">
            <h4>Zip file:</h4>
            <div className="number">
            {zipFile}.zip
            </div>
            <div className="btn">
                {!zipCreated && (
                    <button type="button" onClick={(e) => handleArchive()} className="btn btn-warning">Create Archive</button>
                )}
                {zipCreated && (
                <button type="button" onClick={(e) => handleDownloadZip()} className="btn btn-warning">Download Archive</button>
                )}
            </div>
        </div>
    )
}