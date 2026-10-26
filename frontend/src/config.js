const config = {
    BACKEND_URL: import.meta.env.VITE_NODE_ENV === 'development'
        ? import.meta.env.VITE_BACKEND_LOCAL_URL
        : import.meta.env.VITE_BACKEND_LIVE_URL,

    NODE_ENV: import.meta.env.VITE_NODE_ENV === 'development'
        ? "development"
        : "production",
    GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID
}

export default config