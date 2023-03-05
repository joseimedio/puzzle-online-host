import React, { useEffect, useState } from 'react';

export default function CreatePuzzle () {
    const [imagePath, setImagePath] = useState('');
    const [numCols, setNumCols] = useState('');
    const [numRows, setNumRows] = useState('');
    const [originalImg, setOriginalImg] = useState();
    const [piecesIds, setPiecesIds] = useState();
    const [maxWidth, setMaxWidth] = useState();

    const marginPx = 3;

    const defaultUserId = 1;

    const handleSubmitColsAndRows = (e) => {
        e.preventDefault();

        const originalImage = new Image();
        originalImage.crossOrigin = 'Anonymous';
        originalImage.src = imagePath;
        setOriginalImg(originalImage);

        setMaxWidth(originalImage.width + marginPx*numCols + 10);
        setPiecesIds([...Array(numCols * numRows).keys()]);
    }


    useEffect(() => {
        if (piecesIds) {
            piecesIds.forEach((id) => {
                createPiece(id);
            })
        }
    }, [piecesIds])

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

    // Functions to persist data in the server
    const savePiece = async (puzzleId, id) => {
        const canvas = document.getElementById(String(id));
        const encodedImg = canvas.toDataURL();

        const location = {
            x: canvas.width * (id % numCols),               // PROBABLY WRONG!!
            y: canvas.height * parseInt(id/numCols)
        }

        console.log(location);
  
        const query_res = await(
          await fetch("http://localhost:4000/pieces", {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                localId: id, 
                imgSrc: encodedImg, 
                dimensions: {x:canvas.width, y: canvas.height}, 
                currentLoc: location, 
                trueLoc: location, 
                puzzleId
            })
          })
        ).json();
  
        console.log(query_res);
      };
  
    const savePuzzle = async (req, res, next) => {
        // Let user assign name

        const query_res = await(
            await fetch("http://localhost:4000/puzzles", {
              method: "POST",
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify({
                imagePath, 
                numCols, 
                numRows, 
                userId: defaultUserId
              })
            })
          ).json();
    
        //   console.log(query_res.id);
          const puzzleId = query_res.id; 

        await piecesIds.forEach((id) => {
          savePiece(puzzleId, id);
        })
  
        console.log("Saved successfully!");
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
                    <img id="sample-img"/>
                </div>
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
                            onClick={() => savePuzzle()}
                        >Save</button>
                    )}

                </div>
                
            </div>
        )
    )
}
