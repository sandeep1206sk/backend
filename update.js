const dbConnect = require('./mongo');

const updateData = async ()=>{
    let data= await dbConnect();
    let result = data.updateOne(
        {id:'kit006'},{$set:{name:"niranjan"}}
        )
};
updateData();