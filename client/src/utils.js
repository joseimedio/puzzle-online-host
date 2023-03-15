
const savePuzzleToServer = async (imagePath, numCols, numRows, userId) => {
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
            userId
          })
        })
      ).json();

    console.log(query_res);
    return query_res;
}

const savePieceToServer = async (localId, imgSrc, dimensions, currentLoc, trueLoc, puzzleId) => {
    const query_res = await(
        await fetch("http://localhost:4000/pieces", {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
              localId, 
              imgSrc,
              dimensions, 
              currentLoc, 
              trueLoc, 
              puzzleId
          })
        })
      ).json();

    // console.log(query_res);
}

const saveExtraCharactersToServer = async (localId, imgSrcExtra, puzzleId) => {
    const query_res = await(
        await fetch("http://localhost:4000/pieces/create", {
          method: "PUT",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
              localId, 
              imgSrcExtra,
              puzzleId
          })
        })
      ).json();

      console.log(query_res);
}

module.exports = {
    savePuzzleToServer,
    savePieceToServer,
    saveExtraCharactersToServer
};