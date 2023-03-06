import { useState, useEffect } from "react";

export default function PlayGame() {
    const [data, setData] = useState();
    const [puzzleDimensions, setPuzzleDimensions] = useState({width: 0, height: 0});

    const [mouseCoords, setMouseCoords] = useState({x: 0, y: 0});
    const [prevMouseCoords, setPrevMouseCoords] = useState({x: 0, y: 0})
    const [selectedPiece, setSelectedPiece] = useState(-1);

    // Background texture
    const background_img = "https://img.freepik.com/free-photo/oak-wooden-textured-design-background_53876-143033.jpg?w=2000";
    const background_mat = "https://media.istockphoto.com/id/1092139474/photo/empty-green-casino-poker-table-cloth-with-spotlight.jpg?b=1&s=170667a&w=0&k=20&c=vxjd_9eXbFxziFSEG_tCGogO0ht0tgJ17C2iSx0C21k=";
    const background_width = 1300;
    const backgroun_height = 500;

    // Puzzle and background mat
    const margin = ["20%", "15%"];
    const standardStep = 50;

    const currentURL = window.location.href.split("/");
    const puzzleId = currentURL[currentURL.length - 1];

    // Read data from the server
    useEffect(() => {
      const dataFetch = async () => {
        const serverData = await (
          await fetch("http://localhost:4000/puzzles/" + String(puzzleId))
        ).json();
  
        const pieces = serverData.pieces;
        pieces.sort((a,b) => a.local_id - b.local_id);
        setData(pieces);

        const puzzleInfo = serverData.info[0];
        const dimensions = {
          width: puzzleInfo.num_cols * pieces[0].dimensions.x,
          height: puzzleInfo.num_rows * pieces[0].dimensions.y
        };
        setPuzzleDimensions(dimensions);
        console.log(dimensions);
      };
  
      dataFetch();
    }, []);


    // Functions to persist data in the server
    const updateLocation = async (piece_id) => {
      const newLocation = data[piece_id].current_location;

      const query_res = await(
        await fetch("http://localhost:4000/pieces", {
          method: "PUT",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            puzzle_id: puzzleId, 
            piece_id, 
            current_location: `(${newLocation.x},${newLocation.y})`
          })
        })
      ).json();

      // console.log(query_res);
    };

    const saveProgress = async () => {
      await data.forEach((piece) => {
        updateLocation(piece.local_id);
      })

      console.log("Saved successfully!");
    }


    // Shuffle the pieces 
    const shufflePuzzle = () => {
      data.forEach((element) => {
        const currentX = element.true_location.x;
        const currentY = element.true_location.y;

        const newX = currentX + standardStep*(Math.floor(Math.random()*5) - 2);
        const newY = currentY + standardStep*(Math.floor(Math.random()*4) - 1);

        element.current_location = {x: newX, y: newY};
      })

    };


    // Check if the current position of the pieces is the correct one
    const checkPuzzle = () => {
      let wrongPieces = [];
      data.forEach((element) => {
        if ((element.current_location.x !== element.true_location.x) || 
             (element.current_location.y !== element.true_location.y)){
            wrongPieces.push(1);
        }
      })

      if (wrongPieces.length === 0){
        alert("Congrats!! It's correct!!");
      } else {
        alert("Sorry! Something's wrong...")
      }

    };


    // Keep track of the mouse position
    useEffect(() => {
      const handleMouseMove = event => {
        setMouseCoords({
          x: event.clientX,
          y: event.clientY
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener(
          'mousemove',
          handleMouseMove
        );
      };
    }, []);


    // Handle pieces movement
    const moveSelectedPiece = (mouseCoords, step) => {
      const prevLocation = data[selectedPiece].current_location;

      const deltaX = step*Math.round((mouseCoords.x - prevMouseCoords.x)/step);
      const deltaY = step*Math.round((mouseCoords.y - prevMouseCoords.y)/step);

      const newLocationX = prevLocation.x + deltaX;
      const newLocationY = prevLocation.y + deltaY;
        
      data[selectedPiece].current_location = {x: newLocationX, y: newLocationY};
    };

    const handleDragStartPiece = (e) => {
      setSelectedPiece(e.target.id);
      setPrevMouseCoords({x: e.clientX, y: e.clientY});
    };

    const handleDragEndPiece = (e) => {
      const mouseCoords = {x: e.clientX, y: e.clientY};
      moveSelectedPiece(mouseCoords, standardStep);
    };

    return (
        typeof data === 'undefined'
        ? <div>Loading</div>
        :
          <div>
            <img
              src={background_mat}
              alt="background mat"
              width={puzzleDimensions.width}
              height={puzzleDimensions.height}
              style={{
                position:"absolute",
                left:margin[0],
                top:margin[1]
              }}
            >
            </img>
            <div 
              id="puzzle"
              style={{
                position:"absolute",
                left:margin[0],
                top:margin[1]
            }}
              >
              {data.map(item => {
                  return(
                      <img
                        key={item.local_id} 
                        id={item.local_id} 
                        src={item.img_src}
                        alt={"piece num. " + item.local_id}
                        width={item.dimensions.x}
                        height={item.dimensions.y}
                        style={{
                            position:"absolute",
                            top:item.current_location.y,
                            left:item.current_location.x
                        }}
                        draggable="true"
                        onDragStart={handleDragStartPiece}
                        onDragEnd={handleDragEndPiece}
                      ></img>
                  )
              })}
              </div>
              <img
                src={background_img}
                alt="background"
                width={background_width}
                height={backgroun_height}
              >
              </img>
              <div>
                <button
                  id="shuffle-btn"
                  onClick={shufflePuzzle}
                >Shuffle</button>
                <button
                  id="check-btn"
                  onClick={checkPuzzle}
                >Check</button>
                <button
                  id="save-btn"
                  onClick={saveProgress}
                >Save</button>
              </div>
          </div>

    )
}