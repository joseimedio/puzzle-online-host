import React, { createElement, useEffect, useState } from 'react';


export default function NewPuzzle2 () {
    const [imagePath, setImagePath] = useState('');
    const [numCols, setNumCols] = useState('');
    const [numRows, setNumRows] = useState('');
    const [originalImg, setOriginalImg] = useState();
    const [piecesIds, setPiecesIds] = useState();
    const [maxWidth, setMaxWidth] = useState();

    const marginPx = 3;

    const handleSubmitColsAndRows = (e) => {
        e.preventDefault();

        const originalImage = new Image();
        originalImage.src = imagePath;
        setOriginalImg(originalImage);

        setMaxWidth(originalImage.width + marginPx*numCols + 10);
        setPiecesIds([...Array(numCols * numRows).keys()]);
    }

    useEffect(() => {
        if (piecesIds) {
            displayPuzzle();
        }
    }, [piecesIds])

    const displayPuzzle = () => {
        piecesIds.forEach((id) => {
            createPiece(id);
        })
    }

    const createPiece = (id) => {
        const pieceW = originalImg.width / numCols;
        const pieceH = originalImg.height / numRows;
        
        const canvas = document.getElementById(String(id));
        canvas.width =  pieceW;
        canvas.height =  pieceH;

        const ctx = canvas.getContext('2d');
        const startX = pieceW * (id % numCols);
        const startY = pieceH * parseInt(id/numCols);
     
        ctx.drawImage(originalImg, startX, startY, pieceW, pieceH, 0, 0, pieceW, pieceH);
    }
    

    return (
        imagePath === '' 
        ? 
        (
            <div>
                <form onSubmit={(e) => {e.preventDefault()}}>
                    <input 
                        type="text" 
                        id="url" 
                        placeholder="Paste the url here: "
                        value={imagePath}
                        onChange={(e) => setImagePath(e.target.value)}
                    />
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        )
        : 
        (
            <div>
                <div>
                {piecesIds 
                ? 
                (
                    <div style={{width:maxWidth}}>
                        {piecesIds.map((i) => {
                            return (
                                <canvas 
                                    key={i}
                                    id={i}
                                    style={{marginRight:marginPx}}
                                ></canvas>
                            )
                        })}
                    </div>
                )
                :
                (
                    <div>
                        <img 
                            src={imagePath}
                            
                        ></img>
                    </div>
                )
                }
                </div>
                <div>
                    <form onSubmit={handleSubmitColsAndRows}>
                        <input 
                            type="number" 
                            id="numCols" 
                            placeholder="Write the number of columns: "
                            value={numCols}
                            onChange={(e) => setNumCols(e.target.value)}
                        />
                        <input 
                            type="number" 
                            id="numRows" 
                            placeholder="Write the number of rows: "
                            value={numRows}
                            onChange={(e) => setNumRows(e.target.value)}
                        />
                        <input type="submit" value="Generate puzzle"></input>
                    </form>
                    {piecesIds && (
                        <button
                            
                        >Download</button>
                    )}

                </div>
                
            </div>
        )
    )
}
