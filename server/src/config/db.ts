import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI ?? 'null');
    console.log(`MongoBD connected: ${(await conn).connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

export default connectDB;
