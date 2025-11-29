const path = require("node:path");
const fs = require("node:fs/promises");
const fss = require("node:fs");
const { EventEmitter } = require("node:events");
const os = require("os");
const event = new EventEmitter();

// //Q1
// function returnLogs(){
//     console.log("Dir: ",__dirname);
//     console.log("File: ",__filename);
// }
// returnLogs()

// //Q2
// function returnFIle(filePath){
//     console.log(path.basename(filePath))
// }
// returnFIle("/user/files/report.pdf")

// //Q3
// function returnFormat(obj){
//     console.log(path.posix.format(obj))
// }
// returnFormat({ dir: "/folder", name: "app", ext: ".js"})

// // Q4
// function returnExtension(filePath){
//     console.log(path.extname(filePath))
// }
// returnExtension("/docs/readme.md")

// //Q5
// function returnParse(filePath){
//     const parse = path.parse(filePath)
//     console.log("Name: ",parse.name)
//     console.log("EXT: ",parse.ext)
// }
// returnParse("/home/app/main.js")

// //Q6
// function checkAbselute(filepath){
//     console.log(path.isAbsolute(filepath))
// }
// checkAbselute("/home/user/file.txt")
// checkAbselute("./FIle.txt")

// // Q7
// function joinSegments(...segments) {
//   console.log(path.join(...segments));
// }
// joinSegments("src", "components", "App.js");

// //Q8
// function resolveRelative(filename){
//     console.log(path.resolve(__dirname,filename))
// }
// resolveRelative("./index.js")

// // Q9
// function joinPath(path1,path2) {
//   console.log(path.join(path1,path2));
// }
// joinPath("/folder1", "folder2/file.txt");

// // Q10
// async function deleteFileAsync(filePath) {
//   try {
//     await fs.unlink(filePath);
//     console.log(`${path.basename(filePath)} is deleted.`);
//   } catch (err) {
//     console.error(err.message);
//   }
// }
// deleteFileAsync("data.txt");

// // Q11
// function createFolderSync(folderName) {
//   try {
//     const folderPath = path.join(__dirname, folderName);
//     fs.mkdir(folderPath, { recursive: true });
//     console.log("Success");
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// createFolderSync("Ahmed");

// // Q12
// event.on("start" , ()=>{
//     console.log("Welcome event triggered!")
// })
// event.emit("start");

// // Q13
// event.on("login" , (name)=>{
//     console.log(`User logged in: ${name}`)
// })
// event.emit("login","Ahmed");

// //Q14
// function readFileSync(filePath) {
//   try {
//     const data = fss.readFileSync(filePath, "utf8");
//     console.log("the file content =>", `"${data}"`);
//   } catch (err) {
//     console.error("Error reading file:", err.message);
//   }
// }
// readFileSync("./note.txt");

// // Q15
// async function writeFileAsync(filepath, content) {
//   try {
//     await fs.writeFile(filepath, content, { encoding: "utf-8" ,flag:'a'});
//     console.log('Content successfully written ');
//   } catch (err) {
//     console.error(err.message);
//   }
// }
// writeFileAsync("./async.txt", "Async save");

// // Q16
// async function checkFileExists(path) {
//   try {
//     await fs.access(path);
//     console.log("true")
//   } catch(error) {
//     console.log(error.message)
//   }
// }
// checkFileExists("./note.txt")

// //Q17
// function getSystemInfo() {
//   const info = {
//     Platform: os.platform(),
//     Arch: os.arch()
//   };
//   console.log(info);
// }
// getSystemInfo();
