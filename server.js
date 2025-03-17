const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const cookie = require("cookie");
const app = express();
const PORT = 5000;
const cookieParser = require("cookie-parser");
const { connect } = require('./db');

async function main(action,data,col) {
  const db = await connect();

  // Define the new user document
 if(action=="insert"){

    const resault= await db.collection(col).insertOne(data)
 console.log(resault)
}

 if(action=="insertm"){

    const resault= await db.collection(col).insertMany(data)
 
if(action=="find"){

    const resault=  db.collection(col).find(data)

}



}



  // Insert the new user into the "users" collection

  // Optionally list collections
  const collections = await db.listCollections().toArray();
}

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.urlencoded({ extended: true })); // Add this line to parse URL-encoded data

app.get("/set-cookie", (req, res) => {
    res.cookie("username", "JohnDoe"); // Sets a simple cookie
    res.send("Cookie has been set!");
});

// Create an HTTP server
const server = http.createServer(app);
app.set("view engine", "ejs");
app.use(express.static('dist'));

const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins (modify for production)
        methods: ['GET', 'POST']
    }
});

// MySQL Connection


// Sample Express API Route
io.on('connection',async socket => {
    const db = await connect();
    socket.on("user",(data) => {
 
 io.emit("user",data);

})  
   socket.on('message', async(data) => {
        // Broadcast message to all connected clients
        io.emit('receiveMessage', { message: data });
        console.log(data)

        const resault= await db.collection("messages").insertOne({email: data.email,message: data.message  })
    });
        

    
    const resault=await db.collection("messages").find().toArray()

    socket.emit("oldmessage",resault)

    // Disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
    
app.get('/users2', async (req, res) => {
   const db = await connect()
    const resault= await db.collection("users").find({status:"1"}).toArray()
    console.log(resault)
res.json(resault)
});



app.post('/users', async (req, res) => {
    const db = await connect();

    const { name, email, password } = req.body;
    const resault= await db.collection("users").find({email:email}).toArray()
   console.log(resault)
      if (resault.length === 0) {
           const resault= await db.collection("users").insertOne({email:email,name:name , password:password ,status:0})
             res.json(200)
        } else {
            res.status(400).render("index2", { error: "Something went wrong!" });
        }
    });

app.post('/login',  async (req, res) => {
    const { email, password } = req.body;
    const db = await connect();
    const resault=   db.collection("users").find({email:email}).toArray()
   
    if(resault.length != 0){
   const resault2= await   db.collection("users").updateOne({email:email} , {$set:{status:"1"} })
      console.log(" resault============================================= "  +resault2)
   res.json(200)
    }else{

        res.json(404)

    }

});

app.get

app.get('/logout',  async (req, res) => {
  
 const resaultd=await db.collection("users").updateOne({email:  req.query.email} , {$set:{status:"0"} })

    
   
});

app.get('/',  async (req, res) => {

res.sendFile('dist/index.html')

})
// Start the ser}ver
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
