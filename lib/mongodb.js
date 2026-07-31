import mongoose from "mongoose";

let connectionPromise;

// Lazy: reads MONGODB_URI and opens the connection only the first time a
// route actually calls this, never at module import / build time. Next.js's
// build step imports every route module to collect page data, and an eager
// connect() at module scope breaks that build when env vars aren't set yet.
export default function connectDB() {
  if (connectionPromise) return connectionPromise;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable. Add it to .env.local");
  }

  if (mongoose.connection.readyState === 1) {
    connectionPromise = Promise.resolve(mongoose.connection);
    return connectionPromise;
  }

  const connect = () => mongoose.connect(uri, { dbName: process.env.MONGODB_DB });

  if (process.env.NODE_ENV === "development") {
    if (!global._mongooseConnectionPromise) {
      global._mongooseConnectionPromise = connect();
    }
    connectionPromise = global._mongooseConnectionPromise;
  } else {
    connectionPromise = connect();
  }

  return connectionPromise;
}
