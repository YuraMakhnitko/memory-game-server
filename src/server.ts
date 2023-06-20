import http from 'http';
import dotenv from 'dotenv';
import { app } from './app';
import { mongoConnections } from './services';
const { mongoConnect } = mongoConnections;

dotenv.config();
// console.log(ddd.error);

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServver() {
  await mongoConnect();
}

server.listen(PORT, () => {
  console.log(`Listen on PORT ${PORT}...`);
});

startServver();
