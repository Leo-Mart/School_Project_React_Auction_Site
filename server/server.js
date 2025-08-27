import express from 'express';
import mongoose from 'mongoose';
import apiRegister from './api-register.js';
import session from 'express-session';
import 'dotenv/config';

const server = express();
const port = 3000;

server.use(express.json());
server.use(express.static('client'));

server.use(
  session({
    secret: 'nyckel',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

mongoose.connect(process.env.DATABASE_URL);

apiRegister(server, mongoose);

server.listen(port, () => {
  console.log(`Server open on http://localhost:${port}`);
});
