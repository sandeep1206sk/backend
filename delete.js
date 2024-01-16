const dbConnect = require('./mongo');

const deleteData = async()=>{
    let data = await dbConnect();
    let result = data.deleteOne(
        {id:'kit009'}
    )
}
deleteData();