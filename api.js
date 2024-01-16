const express = require('express');
const dbConnect = require('./mongo');
const app = express();

app.use(express.json());

app.get('/', async(req,res)=>{
    let data = await dbConnect();
    data = await data.find().toArray();
    res.send(data);
});

app.post('/',async(req,res)=>{
    let data = await dbConnect();
    let result = await data.insertOne(req.body);
    res.send(result);
});

app.put('/:name',async(req,res)=>{
    let data = await dbConnect();
    let result = await data.updateOne(
        {name:req.params.name},
        {$set:req.body}
        );
    res.send({status:"update"});
});

app.delete('/:id', async(req,res)=>{
    let data = await dbConnect();
    let result = await data.deleteOne({id:req.params.id})
    res.send('done');
})

app.listen(5000,()=>{
    console.log('server start');
}
)