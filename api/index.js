import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user_route from './routes/user_route.js'
import auth_route from './routes/auth_route.js'
import listing_route from './routes/listing_route.js'
import cookieParser from "cookie-parser"
import path from 'path'
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB ');
}).catch((err) => {console.log(err)})

const __dirname = path.resolve();


const app = express();

app.use(express.text())
app.use(express.json())
app.use(cookieParser())
app.listen(3000, () => {
    console.log('Server is running on port number 3000');
});

// app.get('/', (req, res) => {
    //     res.send("Hello World")
    // })
    


    app.use('/api/user', user_route)
app.use('/api/auth', auth_route)
app.use('/api/listing', listing_route)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use((err, req, res, next ) => {
    const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        return res.status(statusCode).json({
            success : false,
            statusCode,
            message
        })
})