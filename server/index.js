import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors'

import postRoutes from "./routes/posts.js";

const app = express();


app.use(bodyParser.json({limit : "30mb",extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb",extended : true}));
app.use(cors());

app.use("/posts",postRoutes)

//connecting mongoDB : 
const CONNECTION_URL = 'mongodb+srv://MEMORIES_123:SL_MEMORIES_20@cluster0.d7pdh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(() => app.listen(PORT,() => console.log(`CONNECTION IS SUCCESSFUL AT PORT : ${PORT}`)))
    .catch((err) => console.log("error=",err.message));

// mongoose.set('useFindAndModify',false);
