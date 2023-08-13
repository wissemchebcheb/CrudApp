const mongoose = require("mongoose")


const DB ="mongodb+srv://wissemchebcheb:lG55KdIi12jkVIh8@cluster0.bgetls2.mongodb.net/user?retryWrites=true&w=majority"


mongoose.connect(DB,{
    // UseCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("connection start")).catch((error)=>console.log(error.message))