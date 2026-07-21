const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('[MongoDB Error] MONGODB_URI environment variable is missing.');
      return;
    }
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log(`[MongoDB] Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] Failed to connect: ${error.message}`);
  }
};

module.exports = connectDB;
