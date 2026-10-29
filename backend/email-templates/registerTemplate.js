const baseTemplate = require("./baseTemplate")
const registerTemplate = ({ name, password }) => {
    const content = `
        <h2>Welcome to SKILLHUB</h2>
        <p> Hi,${name} </p>
        <p> Thank you for choosing SKILLHUB. </p>
        
    `
    return baseTemplate({
        title: "welcome to SKILLHUB",
        content
    })
}
module.exports = registerTemplate