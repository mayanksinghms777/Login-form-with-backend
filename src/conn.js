const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/Form",{ useNewUrlParser: true ,  useUnifiedTopology: true , useCreateIndex: true })
.then(() => {console.log("connection sucessfull")})
.catch((err) => console.log(err));