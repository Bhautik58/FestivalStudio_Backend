import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index.ts';

const app = express();

app.use(cors({
    credentials : true
}));

app.use(compression())
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/v1', router)

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is running!')
})

const MONGO_URL = 'mongodb://localhost:27017/Festival_Studio'

mongoose.Promise = Promise
mongoose.connect(MONGO_URL).then(() => {
    console.log('Database connected successfully!')
}).catch((error) => console.log(error))