require('dotenv').config()
const config = {
    env: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "Imgonnadancemyhearttillethedawnbutiwontbedonetillmorningcome",
    mongoUri: "mongodb+srv://temitope:IAcfdYhHX3Ixjh0u@merncluster0.hzeku.mongodb.net/mernCluster0?retryWrites=true&w=majority" 
    // process.env.MONGODB_URI ||
    // process.env.MONGO_HOST ||
    // 'mongodb://' + (process.env.IP || 'localhost') + ':' +
    // (process.env.MONGO_PORT || '27017') +
    // '/mernclassroomv1'
}
    export default config