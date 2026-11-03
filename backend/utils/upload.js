const multer = require("multer")

const trekUpload = multer({ storage: multer.diskStorage({}) }).single('hero')

module.exports = trekUpload