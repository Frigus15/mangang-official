const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://mangangofficialstorecs_db_user:mangangofficial@cluster0.l83xneu.mongodb.net/mangang_official?retryWrites=true&w=majority&appName=Cluster0';
    cached.promise = mongoose.connect(mongoUri, {
      bufferCommands: false,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 30000
    }).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

module.exports = connectDB;
