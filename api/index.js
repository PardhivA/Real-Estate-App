import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user_route from './routes/user_route.js'
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB ');
}).catch((err) => {console.log(err)})

const app = express();


app.listen(3000, () => {
    console.log('Server is running on port number 3000');
});

// app.get('/', (req, res) => {
//     res.send("Hello World")
// })

app.use('/api/user', user_route)