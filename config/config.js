const config = {
    env: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "Make person no tell me say i too lazy",
    mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mernprojectv11',
    stripe_connect_test_client_id: " your strip test cclient id",
    stripe_test_secret_key:"sk_test_51H84iCHJ1zBczfLrEw5pdHrmTEyo3DYQyds1E8zEFMUp11ify3S8mmmIgCz1d90hfm1uj7veF26WQIFOSpwvH2VW00eBkaywhp",
    stripe_test_api_key:'pk_test_51H84iCHJ1zBczfLrgtoKcRcnoBs6GpIabvuJDHY9NXK09napgjLSDXLDZcsTJ2vc2GBplcigv6ivWErf3YaXIlLp00dgepJ47J'
}
export default config