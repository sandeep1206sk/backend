const express = require('express');
const storage = require('node-persist');

const app = express();
app.use(express.json());
storage.init();
app.get("/", (req, res) => {
    res.send(`<h1>Deta Manager</h1>`)
    res.end();
});
app.get("/allstudent", async (req, res) => {

    const resp = await storage.values();
    let myResp = `<h1>All Student Deta</h1>`;

    for (let data of resp) {
        myResp += `  <h2>Id: ${data.id}</h2>
                     <h3>Name: ${data.name}</h3>
                    <h3>Branch: ${data.branch}</h3>
                    <h3>GPA: ${data.GPA}</h3>
                    <br>`
    }
    res.send(myResp);
});
app.get("/Student/:id", async (req, res) => {
    const id = req.params.id;
    const resp = await storage.getItem(id);
    if (resp) {

        res.send(`<h1>Student Details</h1>
        <h2>Id: ${resp.id}</h2>
        <h3>Name: ${resp.name}</h3>
       <h3>Branch: ${resp.branch}</h3>
       <h3>GPA: ${resp.GPA}</h3>
       `);
    } else {
        res.send("no student data available with given ID");
    }

});
app.get("/topper", async (req, res) => {

    const resp = await storage.values();
    let myResp = `<h1>Topper Student </h1>`;

    let topper;
    let max = 0;
    for (let data of resp) {
        if (data.GPA > max){
            max = data.GPA;
            topper = data;
        }   
    }
    myResp = `  <h2>Id: ${topper.id}</h2>
    <h3>Name: ${topper.name}</h3>
   <h3>Branch: ${topper.branch}</h3>
   <h3>GPA: ${topper.GPA}</h3>
   <br>`
    res.send(myResp);
});
app.post("/student", async (req, res) => {
    const { id, name, branch, GPA } = req.body;
    const resp = await storage.setItem(id, { id, name, branch, GPA });
    res.send({ message: "student added successfully", resp })
});

app.delete("/student/:id", async (req, res) => {
    const id = req.params.id;
    const resp = await storage.getItem(id);
    if (resp) {
        await storage.removeItem(id);
        res.send(`user deleted with id ${id}`)
    } else {
        res.send("no student data available with given ID");
    }
});
app.put("/student/:id", async (req, res) => {
    const id = req.params.id;
    const { name, branch, GPA } = req.body;
    const resp = await storage.getItem(id);
    if (resp) {
        resp.name = name;
        resp.branch = branch;
        resp.GPA = GPA;
        await storage.setItem(id, resp);
        res.send(`student updated with id ${id}`)
    } else {
        res.send("no student data available with given ID");
    }
});

app.listen(5000, () => {
    console.log("server start at localhost:5000");
});