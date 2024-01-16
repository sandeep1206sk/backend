const dbConnect= require('./mongo');

const insert = async()=>{
    const db = await dbConnect();
    const result = db.insertOne(
        {id:'kit007',name:'niranjan',branch:'It',GPA:'0.1'}
        )
}
insert();