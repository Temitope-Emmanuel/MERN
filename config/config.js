const config = {
    env: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || "Make person no tell me say i too lazy",
    mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mernclassroomv1'
}
    export default config