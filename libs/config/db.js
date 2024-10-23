import mongoose from "mongoose";

export const DBconnect = async () => {
    await mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log("DB connected!"))
        .catch(err => console.log(err.message));
}
