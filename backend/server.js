const exp = require('express');
const app = exp();

/*  {env is environmental variable if it doesn't run upon submission to webbrowser then it uses environmenal varible
given in .env file if it is not available it takes other serever number assigned to it (here it is 5000)}  */
require('dotenv').config();

//setup mongodb
const mongoClient = require('mongodb').MongoClient;

const path = require('path');

//deploying react build in this server
app.use(exp.static(path.join(__dirname,'../client/build')))

mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get db obj
    const blogDB = client.db('blog-app');
    //get collection obj
    const userCollection = blogDB.collection('userCollection');

    //get aricle collection
    const articlesCollection = blogDB.collection('articlesCollection');

    //get author collection:
    const authorCollection = blogDB.collection('authorCollection');

    //set collection obj with express app
    app.set('userCollection', userCollection)
    app.set('articlesCollection', articlesCollection)
    app.set('authorCollection',authorCollection)

    console.log('mongoDB connection successful')
})
.catch(err=>console.log(err))

// Middleware to parse JSON requests
app.use(exp.json());

// Importing API routes
const userApp = require('./APIs/user');
const authorApp = require('./APIs/author');
const adminApp = require('./APIs/admin');

// Route handling
app.use('/user-api', userApp);
app.use('/author-api', authorApp);
app.use('/admin-api', adminApp);

//routing middleware from react || deals with page refresh 
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

    

// Error handling middleware
app.use((err, req, res, next) => {
    res.send({ message: 'error', payload: err });
});

// Assign port number
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`web server on port ${port}`));
