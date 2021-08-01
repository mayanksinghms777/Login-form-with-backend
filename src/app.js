const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const hbs = require('hbs')
const Register = require('./registers')
require("./conn")
const port = process.env.PORT || 3000

const staticpath = path.join(__dirname,"../public")
const templatespath = path.join(__dirname,"../templates/views")
const partialspath = path.join(__dirname,"../templates/partials")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set("view engine", "hbs")
app.set("views",templatespath)
hbs.registerPartials(partialspath)

app.get('/index', (req, res) => {
  res.render("index")
})

app.get('/register', (req, res) => {
  res.render("register")
})

app.post('/index', async (req, res) => {
  try{
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if(password === cpassword){

      const logins = new Register({
        firstname :req.body.firstname,
        lastname :req.body.lastname,
        email :req.body.email,
        gender : req.body.gender,
        phone : req.body.phone,
        age : req.body.age,
        password :password ,
        confirmpassword : cpassword
      })
     const logined = await logins.save()
     res.status(201).render("index");

    }else{
      res.send("password not matched")
    }

  }catch(e){
    res.status(400).send(e);
  }
})

app.post('/register', async (req, res) => {
  try{
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({email:email})

    if(useremail.password === password){
     res.status(201).render("index1")

    }else{
      res.send("password not matched")
    }

  }catch(e){
    res.status(400).send(e);
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})