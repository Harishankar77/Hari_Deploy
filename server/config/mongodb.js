import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGODB_URI}/mern_auth`)
    .then(() => {
      console.log(`Connected to Dtata Base!!`);
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connectDB;
