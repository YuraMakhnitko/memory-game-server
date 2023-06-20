import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl: string | undefined = process.env.MONGODB_URL;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (error) => {
  console.error(error, 'mongo connection error');
});

export async function mongoConnect() {
  if (mongoUrl) {
    await mongoose.connect(mongoUrl);
  }
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}
