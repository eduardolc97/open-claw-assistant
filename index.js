import express from 'express';
import "dotenv/config";

import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const app = express();
const port = 3000;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

export const prisma = new PrismaClient({ adapter });

const createUser = async ({ id, name, email }) => {
  return prisma.user.create({
    data: {
      id, name, email
    }
  }); 
}

const getUsers = async () => {
  const users = await prisma.user.findUnique({ where: { id: '1'}});
  return users;
}

app.get('/users', async (req, res) => {
  console.log(JSON.stringify(await getUsers()));
  res.send(JSON.stringify(await getUsers()));
})

app.post('/users', async (req, res) => {
  const createdUser = createUser({id: '3', name: 'Kaique', email: 'kaique_cerato@hotmail.com'});
  res.send('Success!');
})

app.listen(port, () => {
  console.log('Working');
});