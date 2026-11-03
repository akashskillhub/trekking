const config = require('../config')

const cloud = require('cloudinary').v2
cloud.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
})

module.exports = cloud