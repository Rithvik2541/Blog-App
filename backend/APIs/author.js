const exp = require('express')
let authorApp = exp.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const verifyToken = require('../Middlewares/verifyToken')

let authorCollection, articlesCollection;

//collection created should be available to api using middleware
authorApp.use((req,res,next)=>{
    authorCollection = req.app.get('authorCollection')
    articlesCollection = req.app.get('articlesCollection')
    next();
})

//author registeration route,
authorApp.post('/author', async(req, res) => {
    const newAuthor = req.body;
    //check whether any author present or not;
    const dbAuthor = await authorCollection.findOne({name : newAuthor.name})
    if(dbAuthor!==null){
        res.send({message:"author Existed"})
    }
    else{
       //hash the password
       const hashedPassword = await bcryptjs.hash(newAuthor.password,4)
       //repalce hashpassword with plain password
       newAuthor.password = hashedPassword;
       //create Author
       await authorCollection.insertOne(newAuthor)

       res.send({message:"Author added successfully"})
    }
});


//author login route,
authorApp.post('/login',async(req,res)=>{
    const loginAuthor = req.body;
    //check whether any Author present or not
    const status = await authorCollection.findOne({name : loginAuthor.name})

    if(status !== null){
        //compare passwords
        const pass = await bcryptjs.compare(loginAuthor.password, status.password)
        if(pass === false){
            res.send({message: "invalid password"})
        }else{
            //if password matched create jwt token,
            const signedToken = jwt.sign({name: status.name}, process.env.SECRET_KEY,{expiresIn : '1d'})
            res.send({message: "Login success", token : signedToken, Author: status})
        }
    }
    else if(status === null){
        res.send({message: 'credentials does not exits'})
    }
})


//adding articles for author:
authorApp.post('/article',verifyToken, async(req,res)=>{
    const article = req.body;
    await articlesCollection.insertOne(article)
    res.send({message: "article added"})
})


//updating articles by author:
authorApp.put('/article',verifyToken, async(req,res)=>{
    const article = req.body;
    const status = await articlesCollection.findOne({articleId : article.articleId})
    if(status === null){
        res.send({message: "no article exists"})
    }
    else{
        await articlesCollection.updateOne({articleId : article.articleId},{$set:{...article}})

        let latestArticle = await articlesCollection.findOne({articleId : article.articleId})

        res.send({message: "article updated", article: latestArticle})
    }
})


//soft delete by author
authorApp.put('/article/:articleID',verifyToken,async(req,res)=>{
    const articleID = (+req.params.articleID);
    let articleToDelete = req.body;
    const newStatus = !articleToDelete.status;
    if(articleToDelete.status === true){
        let modifiedArticle = await articlesCollection.findOneAndUpdate({articleId : articleID},{$set:{status: newStatus}},{returnDocument : "after"}) 
        //await articlesCollection.updateOne({articleId : articleID})
        res.send({message:"article deleted", payload : modifiedArticle.status})
    }
    
    if(articleToDelete.status === false){
        let modifiedArticle = await articlesCollection.findOneAndUpdate({articleId : articleID},{$set:{status: newStatus}},{returnDocument : "after"}) 
        //await articlesCollection.updateOne({articleId : articleID})
        res.send({message:"article restored", payload : modifiedArticle.status})
    }

    
    // const article = await articlesCollection.findOne({articleId : articleID});
    
    // if(article === null){
    //     res.send({message: "No article exists with the given ID"});
    // } else {
    //     const newStatus = !article.status;
    //     await articlesCollection.updateOne({articleId : articleID},{$set:{status: newStatus}});
        

    //     res.send({message: newStatus ? "Article restored" : "Article deleted"});
    // }
});



//get articles by written by author
authorApp.get('/article/:user',verifyToken, async(req,res)=>{
    const user = req.params.user;
    let articlesByAuthor = await articlesCollection.find({name : user}).toArray();
    res.send({message:"List Of articles" ,payload : articlesByAuthor})
})

module.exports = authorApp