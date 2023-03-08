import React, { useEffect, useState } from 'react';

export default function CreatePuzzle () {
    const [imagePath, setImagePath] = useState('');
    const [originalImage, setOriginalImage] = useState();
    const [numCols, setNumCols] = useState(1);
    const [numRows, setNumRows] = useState(1);
    const [piecesIds, setPiecesIds] = useState();
    const [maxWidth, setMaxWidth] = useState();
    const [scaleFactor, setScaleFactor] = useState(1);

    const imageMaxWidth = 650;
    const imageMaxHeight = 450;
    
    const marginPx = 1;

    const defaultUserId = 1;

    const handleSubmitImage = (e) => {
        const imageURL = e.target.value;
        setImagePath(imageURL);

        const newImage = new Image();
        newImage.crossOrigin = 'Anonymous';
        newImage.src = imageURL;
        newImage.addEventListener('load', (e) => {
            setOriginalImage(newImage);
            
            const widthToMaxRatio = newImage.width / imageMaxWidth; 
            const heightToMaxRatio = newImage.height / imageMaxHeight; 
            if (widthToMaxRatio > 1 || heightToMaxRatio > 1) {
                const k = 1 / Math.max(widthToMaxRatio, heightToMaxRatio);
                setScaleFactor(k);

                console.log("Scale factor set to " + k);
            }
        })
    }

    const handleSubmitColsAndRows = (e) => {
        e.preventDefault();

        const k = scaleFactor;
        setMaxWidth(originalImage.width*k + marginPx*numCols + 10);
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
        const k = scaleFactor;

        const pieceW = originalImage.width / numCols;
        const pieceH = originalImage.height / numRows;
        
        const canvas = document.getElementById(String(id));
        canvas.width =  pieceW*k;
        canvas.height =  pieceH*k;

        const ctx = canvas.getContext('2d');
        const startX = pieceW * (id % numCols);
        const startY = pieceH * parseInt(id/numCols);
     
        ctx.drawImage(originalImage, startX, startY, pieceW, pieceH, 0, 0, pieceW*k, pieceH*k);
    }

    // Functions to persist data in the server
    const savePiece = async (puzzleId, id) => {
        const canvas = document.getElementById(String(id));
        const encodedImg = canvas.toDataURL();

        const location = {
            x: canvas.width * (id % numCols),               
            y: canvas.height * parseInt(id / numCols)
        }
  
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
  
        // console.log(query_res);
      };
  
    const savePuzzle = async (req, res, next) => {

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
    
        //   console.log(query_res);
          const puzzleId = query_res.id; 

        console.log(piecesIds);
        await piecesIds.forEach((id) => {
          savePiece(puzzleId, id);
        })
  
        alert("Puzzle " + String(puzzleId) + " was successfully saved!");
      }      


    return (
        imagePath === '' 
        ? 
        (
            <div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="text" 
                        id="url" 
                        placeholder="Paste the url here: "
                        value={imagePath}
                        onChange={handleSubmitImage}
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
                                    className="puzzle-piece-canvas"
                                    style={{
                                        margin: marginPx
                                    }}
                                ></canvas>
                            )
                        })}
                    </div>
                )
                :
                (
                    <div 
                        id="image-container"
                    >
                        <img
                            id="original-image"
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
