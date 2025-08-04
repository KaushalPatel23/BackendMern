import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connecterd !! DB HOST: ${connectInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR", error);
    process.exit(1); //process he refferense ahe je process chalu aahe tyacha jr error aala t process.exit(1) n process thambun jail
  }
};

export default connectDB;




/*approch 1 to coonect the backend
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`lisening on ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error :", error);
    throw err;
  }
})();
*/
