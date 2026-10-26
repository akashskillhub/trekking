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
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASS,
    OTP_EXPIRY_SECONDS: process.env.OTP_EXPIRY_SECONDS,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
}

module.exports = config