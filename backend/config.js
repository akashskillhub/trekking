const config = {
    DATABASE_URL: process.env.NODE_ENV === 'development'
        ? process.env.DATABASE_LOCAL_URL
        : process.env.DATABASE_LIVE_URL,
    CORS_ORIGIN: process.env.NODE_ENV === 'development'
        ? process.env.FRONTEND_LOCAL_URL
        : process.env.FRONTEND_LIVE_URL,
    ENV: process.env.NODE_ENV === 'development'
        ? 'development'
        : 'production',
}

module.exports = config