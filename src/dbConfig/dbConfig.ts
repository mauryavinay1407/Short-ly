import mongoose from "mongoose";

export async function dbConnect(){
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/short-ly`);
      const connection=mongoose.connection;

      connection.on('connected',()=>{
        console.log('MongoDB connected successsfully');
      })

      connection.on('error',(err)=>{
        console.log('There is a problem in DB url string ,kindly check !!!' + err);
        process.exit();
      })
    } catch (error:any) {
        console.log("Something went wrong!");
        console.log(error);
    }
}