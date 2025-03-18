require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const {ApolloServer} = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const {typeDefs, resolvers} = require('./graphql/index');
const uri = process.env.URI;
const mongoose = require('mongoose');

// Use Middleware
// app.use(cors());
  app.use(cors({
    origin: "*", // Adjust for production
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  }))
app.use(express.json());


// Check the db Connection
mongoose.connect(uri)
.then(()=> console.log("MongoDb Conneted Successfully"))
.catch((err)=> console.log("Connection Error on mongodb"))



// Start the server
async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers,  csrfPrevention: false, // ✅ Disable CSRF prevention
        introspection: true, });
    await server.start();

    // Apply Express middleware
    app.use("/graphql", expressMiddleware(server));
}
startApolloServer();




app.get('/', (req, res)=>{
    res.send('Hello');
    console.log('World');
})

app.listen(port, ()=>{
   console.log('Server is Running in Port: ', port);
});