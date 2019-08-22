import fs from "fs";
import path from "path";

export async function loadData(fileNames) {
  const getFileData = fileName => {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, `../data/${fileName}`), (err, data) => {
        if (err) {
          reject();
        }
        resolve(JSON.parse(data));
      });
    });
  };

  const arrayOfPromisesWithFileData = [];
  for (let i = 0; i < fileNames.length; i++) {
    arrayOfPromisesWithFileData.push(getFileData(fileNames[i]));
  }
  const result = await Promise.all(arrayOfPromisesWithFileData);
  return result;
}
