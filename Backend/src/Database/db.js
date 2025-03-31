const {connect} = require("mongoose");
const connectDB = async(url)=>{
    try {
        await connect(url)
        console.log("Connect to database")
    } catch (error) {
        console.log("Error connecting to database")
        console.log(error)
    }
}

module.exports = connectDB

