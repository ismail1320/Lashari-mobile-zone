import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<typeof mongoose>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoosePromise?: Promise<typeof mongoose>
  }

  if (!globalWithMongo._mongoosePromise) {
    globalWithMongo._mongoosePromise = mongoose.connect(uri, options)
  }
  clientPromise = globalWithMongo._mongoosePromise
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = mongoose.connect(uri, options)
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise