const mongoose=require("mongoose");

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://anukrit77:whO9Se6Fo6Td1tha@projectnode.4tai5.mongodb.net/devTinder");
}
module.exports=connectDB;
