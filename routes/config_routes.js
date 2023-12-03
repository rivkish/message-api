const main =require("./index.js")
const user =require("./users.js")
const message =require("./messages.js")





exports.routesInit=(app)=>{
    app.use("/",main)
    app.use("/user",user)
    app.use("/message",message)
}