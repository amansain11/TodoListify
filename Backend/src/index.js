import 'dotenv/config'
import connectDB from './db/dbconnection.js';
import app from './app.js';

const port = process.env.PORT;

connectDB()
.then(()=>{
    app.on("error", (error)=>{
        console.log("ERROR: ", error);
        throw error
    })
    app.listen(port || 8000, ()=>{
        console.log(`Server is running at port : ${port}`);
    })
})
.catch((error)=>{
    console.log("MONGO db connection failed !! ", error);
})