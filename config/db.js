const mongoose = require('mongoose')
const mysql = require('mysql')

// const connectDB = async () => {
//     const conn = await mongoose.connect(process.env.MONGODB_URL);
//     console.log(`MongoDB Connected : ${conn.connection.host}`)
// }

const config =  mysql.createConnection({
    user: "root",
    password: "",
    database: "suptertopup",
    host: "localhost"
});

if(config){
    console.log(`mysqli Connected : ${config} `)
}


module.exports = config;