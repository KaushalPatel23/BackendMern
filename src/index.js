import dotenv from "dotenv";
import connectDB from "./db/database.js";

dotenv.config({ path: "./env" });

connectDB();

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
