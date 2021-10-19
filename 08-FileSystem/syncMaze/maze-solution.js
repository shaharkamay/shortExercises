//08-FileSystem\maze-example\maze-solution.js
const fs = require("fs");

const basePath = "C:/dev/shortExercises/08-FileSystem/syncMaze";
const mapArray = [];


const mazeFilesArray =  folderToFileArray(basePath + "/maze"); //C:/dev/shortExercises/08-FileSystem/maze


function mapToTreasure(mapArray) { //receives an array with the clues paths and set the map.txt
    let mapString = "";
    mapArray.forEach((cluePath) => {
        mapString += cluePath + '\n';
    });
    fs.writeFileSync("./map.txt", mapString);
}

//'{"treasure":true}' / '{"clue":"./maze/room-1/room-0"}' / "hdfhfdhy"
function isTreasure(chestValue) { //receives chestValue and returns if treasure or not
    if(chestValue.indexOf('{"treasure":true}') !== -1) {
        return true;
    }
    return false;
}

function findTreasureSync(dirPath) { //gets directory path and return new clue path
    const filesArr = folderToFileArray(dirPath);
    const nextPath = getFilesPaths(filesArr, dirPath);
    if(nextPath === true) {
        console.log("We found the treasure!");
        return mapArray;
    }
    return findTreasureSync(nextPath);
}


function getFilesPaths(filesArray, path) { //filesArray = ['room-0', '', '', 'chest-1.json', '', '']
    let cluePath;
    let treasure = false;
    filesArray.forEach((file) => {
        if(!isFolder(file)) {
            if(validateChest(file)) {
                let filePath = `${path}/${file}`; // C:/dev/shortExercises/08-FileSystem/chest-1.json
                const chestValue = getChestValue(filePath);
                if(isTreasure(chestValue)) {
                    treasure =  true;
                } else if(validateClue(chestValue)) {
                    const chestClue = getChestClue(filePath); // ./maze/room-1/room-0
                    mapArray.push(chestClue.replace("/maze", ""));
                    cluePath = `${basePath}${chestClue}`.replace(".", "");
                }
            }
        } 
    });
    if(treasure) {
        mapToTreasure(mapArray);
        return true;
    }
    return cluePath;
}

function getChestValue(filePath) {
    return fs.readFileSync(filePath).toString();
}

function getChestClue(chestPath) {
    return JSON.parse(fs.readFileSync(chestPath).toString()).clue;
}

function folderToFileArray(dirPath) {
    return stringToArray(fs.readdirSync(dirPath).toString());
}

function stringToArray(filesNameStr) {
    return filesNameStr.split(",");
}

function isFolder(fileName) {
    return fileName.indexOf('.') === -1 ? true : false;
}

function validateChest(fileName) {
    if(fileName.slice(0, 5) === "chest") {
        return fileName;
    }
}

function validateClue(chestValue) { // {"clue":"./maze/room-1/room-0"}
    if(chestValue.indexOf('{') !== -1) {
        if(JSON.parse(chestValue).clue.indexOf("./maze") >= 0) {
            return chestValue;
        }
    }
    return null;
}

let clueTest = findTreasureSync(basePath + "/maze");