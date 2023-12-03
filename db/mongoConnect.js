// getting-started.js
const mongoose = require('mongoose');
const {config} =require("../config/secret.js")
main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery',false)
    mongoose.connect(`mongodb+srv://${config.userDB}:${config.passDB}@cluster0.rvgzakb.mongodb.net/manageDB`);
console.log("mongoDB connect")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}