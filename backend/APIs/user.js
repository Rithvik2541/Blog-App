const exp = require('express');
const userApp = exp.Router();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const verifyToken = require('../Middlewares/verifyToken')

let userCollection, articlesCollection;

//collection created should be available to api using middleware
userApp.use((req,res,next)=>{
    userCollection = req.app.get('userCollection')
    articlesCollection = req.app.get('articlesCollection')
    next();
})

//user registeration route,
userApp.post('/user', async(req, res) => {
    const newUser = req.body;
    //check whether any user present or not;
    const dbUser = await userCollection.findOne({name : newUser.name})
    if(dbUser!==null){
        res.send({message:"user Existed"})
    }
    else{
       //hash the password
       const hashedPassword = await bcryptjs.hash(newUser.password,4)
       //repalce hashpassword with plain password
       newUser.password = hashedPassword;
       //create user
       await userCollection.insertOne(newUser)

       res.send({message:"User added successfully"})
    }
});


//user login route,
userApp.post('/login',async(req,res)=>{
    const loginUser = req.body;
    //check whether any user present or not
    const status = await userCollection.findOne({name : loginUser.name})

    if(status !== null){
        //compare passwords
        const pass = await bcryptjs.compare(loginUser.password, status.password)
        if(pass === false){
            res.send({message: "invalid password"})
        }else{
            //if password matched create jwt token,
            const signedToken = jwt.sign({name: status.name}, process.env.SECRET_KEY,{expiresIn : '1d'})
            res.send({message: "Login success", token : signedToken, user: status})
        }
    }
    else if(status === null){
        res.send({message: 'credentials does not exits'})
    }
})

//reading articles of all users:
userApp.get('/articles',verifyToken, async(req,res)=>{  
    //get articles from express app

    let articles = await articlesCollection.find().toArray();

    res.send({message: "articles", payload: articles})
})


//writing comments:
userApp.post('/comment/:articleId',verifyToken, async(req,res)=>{
    //get user comment object
    let userComment = req.body;
    const articleID = (+req.params.articleId)
    //insert userComment to existing database
    let result = await articlesCollection.updateOne({articleId : articleID},{$addToSet : {comments : userComment}})
    console.log(result)

    res.send({message: "comment added"})
})


module.exports = userApp;