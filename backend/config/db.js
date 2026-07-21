const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://mangangofficialstorecs_db_user:mangangofficial@cluster0.l83xneu.mongodb.net/mangang_official?retryWrites=true&w=majority&appName=Cluster0';
    const conn = await mongoose.connect(mongoUri, {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log(`[MongoDB Atlas] Connected successfully to ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] Failed to connect: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
