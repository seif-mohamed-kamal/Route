const { randomUUID } = require("node:crypto");
const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const app = express();
let port = 3000;
const filePath = path.resolve("./users.json");

let users = [];
app.use(express.json());

//GET ALL USERS
app.get("/user", (req, res, next) => {
  console.log({ body: req.body });
  const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
  //   let data = ''
  //   readStream.on("data" , (chunk)=>{
  //     data += chunk
  //   })
  //   readStream.on("end" , () =>{
  //     res.json({data : JSON.parse(data)})
  //   })
  readStream.pipe(res);
});

//POST USER
app.post("/user", (req, res, next) => {
  console.log({ body: req.body });
  const { name, age, email } = req.body;
  console.log({ name, age, email });
  const data = fs.readFileSync(filePath, "utf-8");
  users = JSON.parse(data);

  const checkEmailExist = users.find((user) => {
    return user.email == email;
  });
  if (checkEmailExist) {
    return res.status(409).json({ message: "Email Already Exist" });
  }
  users.push({ id: randomUUID(), name, age, email });
  fs.writeFileSync(filePath, JSON.stringify(users), {
    encoding: "utf-8",
    method: "A",
  });
  return res.status(201).json({ message: "User Added Successfully", users });
});

//GET USER BY NAME
app.get("/user/getByName", (req, res) => {
  const { name } = req.query;

  const data = fs.readFileSync(filePath, "utf-8");
  const users = JSON.parse(data);
  const matchedUsers = users.filter((u) => u.name.includes(name));
  if (matchedUsers.length == 0) {
    return res.status(404).json({ message: "User Not Found" });
  }
  return res.status(200).json({ users: matchedUsers });
});

//FILTER BY AGE
app.get("/user/filter", (req, res) => {
  const { age } = req.query;

  const data = fs.readFileSync(filePath, "utf-8");
  const users = JSON.parse(data);
  const matchedUsers = users.filter((u) => u.age >= age);
  if (matchedUsers.length == 0) {
    return res.status(404).json({ message: "User Not Found" });
  }
  return res.status(200).json({ users: matchedUsers });
});

// GET ONE USER
app.get("/user/:id", (req, res, next) => {
  const { id } = req.params;
  // console.log(req.params)
  console.log(id);
  // console.log(req.body)
  const data = fs.readFileSync(filePath, "utf-8");
  users = JSON.parse(data);
  const GetUserById = users.find((user) => user.id === id);
  if (GetUserById) {
    return res.status(200).json({ user: GetUserById });
  }
  return res.status(404).json({ message: "User Not Found" });
});

//DELETE ONE USER
app.delete("/user/:id", (req, res, next) => {
  const { id } = req.params;
  // console.log(req.params)
  console.log(id);
  // console.log(req.body)
  const data = fs.readFileSync(filePath, "utf-8");
  users = JSON.parse(data);
  const GetUserById = users.find((user) => user.id === id);
  if (GetUserById) {
    const NewUsers = users.filter((user) => user.id != id);
    fs.writeFileSync(filePath, JSON.stringify(NewUsers));
    return res.status(200).json({ message: "user deleted successffully" });
  }
  return res.status(404).json({ message: "User Not Found" });
});

app.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  const data = fs.readFileSync(filePath, "utf-8");
  const users = JSON.parse(data);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "USER NOT FOUND" });
  }
  if (name) user.name = name;
  if (age) user.age = age;
  if (email) user.email = email;
  fs.writeFileSync(filePath, JSON.stringify(users), "utf-8");
  return res.status(200).json({message: "User Updated Successfully",user: user,});
});

app.listen(port, "127.0.0.1", () => {
  console.log(`server is running on port ${port} ............`);
});

