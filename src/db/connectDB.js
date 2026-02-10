import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Database', response.connection.host);
  } catch(error) {
    console.log('MongoDB connection error: ', error);
    process.exit(1);
  }
}

export default connectDB;