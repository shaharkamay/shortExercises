//08-FileSystem\maze-example\maze-solution.js
const fs = require("fs");
const basePath = "C:/dev/shortExercises/08-FileSystem";

const mazeFilesArray =  folderToFileArray(basePath + "/maze"); //C:/dev/shortExercises/08-FileSystem/maze

getFilesPaths(mazeFilesArray, (basePath + "/maze"));

function getFilesPaths(filesArray, basePath) {
    const filesPathsArr = [];
    filesArray.forEach((file) => {
        if(!isFolder(file)) {
            if(validateChest(file)) {
                // filesPathsArr.push(`${basePath}/${file}`); //chest-1.json
                let filePath = `${basePath}/${file}`;
                const k = getChestClue(filePath);
            }
        }
    });
    return filesPathsArr;
}

function getChestClue(chestPath) {
    validateClue(fs.readFileSync(chestPath).toString());
    // if(typeof fs.readFileSync(chestPath).toString() === 'object') {
    //     console.log(JSON.parse(fs.readFileSync(chestPath).toString()).clue);
    // }
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

function validateClue(clueValue) {
    if(clueValue.indexOf('{') !== -1) {
        if(JSON.parse(clueValue).clue.indexOf("./maze") >= 0) {
            return clueValue;
        }
    }
}