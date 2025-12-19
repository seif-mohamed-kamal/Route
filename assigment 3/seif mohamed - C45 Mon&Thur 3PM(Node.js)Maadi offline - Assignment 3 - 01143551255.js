const fs = require("node:fs");
const path = require("node:path");
const { createGzip } = require("node:zlib");
const http = require("node:http");
//------------------PART 1 -------------------------//
// // Q1
// const filePath = path.resolve("./Big.txt");
// const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
// readStream.on("readable", () => {
//   console.log({ message: "readable" });
//   readStream.read();
// });

// readStream.on("data", (chunk) => {
//   console.log({ chunk });
// });

// // Q2
// const filePath = path.resolve("./Big.txt");
// const desPath = path.resolve("./des.txt")
// const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
// const writeStraem = fs.createWriteStream(desPath)
// readStream.pipe(writeStraem)

// // Q3
// const zip = createGzip();
// const filePath = path.resolve("./Big.txt");
// const desPath = path.resolve("./z.txt.gz")
// const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
// const writeStraem = fs.createWriteStream(desPath)
// readStream.pipe(zip).pipe(writeStraem)

//------------------PART 2 -------------------------//
// All Questions
// const server = http.createServer((req, res) => {
//   //GET USERS
//   if (req.method === "GET" && req.url === "/user") {
//     const filePath = path.resolve("./user.json");
//     const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
//     res.writeHead(200, { "content-type": "appllication/json" });
//     readStream.on("data", (chunk) => {
//       let body = "";
//       body += chunk.toString();
//       console.log({ body: JSON.parse(body) });
//     });
//     readStream.pipe(res);
//   }

//   //Post USER
//   if (req.method === "POST" && req.url === "/user") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//       // console.log({body})
//     });

//     req.on("end", () => {
//       const { name, email } = JSON.parse(body);
//       console.log({ body: JSON.parse(body) });
//       let users = [];
//       const filePath = path.resolve("./user.json");
//       const data = fs.readFileSync(filePath, "utf-8");
//       users = JSON.parse(data);
//       const chechUserEmail = users.find((user) => {
//         return user.email == email;
//       });
//       if (chechUserEmail) {
//         res.writeHead(409, { "content-type": "appllication/json" });
//         res.write(JSON.stringify({ message: "Email Already Exist" }));
//         res.end();
//       } else {
//         users.push({ id: Date.now(), name, email });
//         fs.writeFileSync(filePath, JSON.stringify(users), {
//           encoding: "utf-8",
//           method: "A",
//         });
//         res.writeHead(201, { "content-type": "appllication/json" });
//         res.write(JSON.stringify({ message: "DONE" }));
//         res.end();
//       }
//     });
//   }

//   //PATCH USER
//   if (req.method === "PATCH" && req.url.startsWith("/user/")) {
//     const id = req.url.split("/")[2]; // /user/5 → "5"

//     const filePath = path.resolve("./user.json");
//     const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//     const user = users.find((u) => u.id == id);

//     if (!user) {
//       res.writeHead(404, { "content-type": "application/json" });
//       return res.end(JSON.stringify({ message: "User Not Found" }));
//     }

//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
//     });
//     req.on("end", () => {
//       const data = JSON.parse(body);

//       if (data.name) user.name = data.name;
//       if (data.email) user.email = data.email;

//       fs.writeFileSync(filePath, JSON.stringify(users));
//       res.writeHead(200, { "content-type": "application/json" });
//       res.end(JSON.stringify({ message: "User Updated" }));
//     });
//   }

//   // GET /user/:id
//   if (req.method === "GET" && req.url.startsWith("/user/")) {
//     const id = req.url.split("/")[2]; // "5"
//     const filePath = path.resolve("./user.json");
//     const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//     const user = users.find((u) => u.id == id);
//     if (!user) {
//       res.writeHead(404, { "content-type": "application/json" });
//       return res.end(JSON.stringify({ message: "User Not Found" }));
//     }
//     res.writeHead(200, { "content-type": "application/json" });
//     return res.end(JSON.stringify(user));
//   }

//   // DELETE USER
//   if (req.method === "DELETE" && req.url.startsWith("/user/")) {
//     const id = req.url.split("/")[2]; // "5"
//     const filePath = path.resolve("./user.json");
//     const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//     const user = users.find((u) => u.id == id);
//     if (!user) {
//       res.writeHead(404, { "content-type": "application/json" });
//       return res.end(JSON.stringify({ message: "User Not Found" }));
//     } else {
//       const updatedUsers = users.filter((u) => u.id != id);
//       fs.writeFileSync(filePath, JSON.stringify(updatedUsers));
//       res.writeHead(200, { "content-type": "application/json" });
//       return res.end(JSON.stringify({ message: "User Deleted successfully" }));
//     }
//   }
// });

// server.listen(3000, () => {
//   console.log("🚀 Server running on port 3000");
// });


//------------------PART 3 -------------------------//
// Q1
// The Event Loop allows Node.js to do multitask athough it is a single thread.

// Q2
// libuv is a C library
// libuv handles Asynchronous file system operations , The event loop , Timers

// Q3
// Node.js sends Asynchronous Operations to libuv.
// libuv does them in the background.
// When they finish, the Event Loop runs your callback.

// Q4
// Call Stack → runs synchronous code.
// Event Queue → stores asynchronous callbacks waiting to run.
// Event Loop → move callbacks from the Event Queue to the Call Stack.

// Q5
// Node.js uses a hidden thread pool in libuv (default 4 threads) to handle async work.
// You can change its size using process.env.${size}.

// Q6
// Blocking code freezes the event loop.
// Non-blocking code uses libuv to run tasks in the background so Node.js can keep working.