import { PrismaClient } from '@prisma/client';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import express, { Express } from "express";
import { buildSchema } from 'type-graphql';
import { TaskResolver } from './GraphQL/resolvers/todo';
import userResolver from './GraphQL/resolvers/user';

require("dotenv").config();

const app: Express = express();
const prisma = new PrismaClient();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());


const startServers = async () => {
  try {
    await prisma.$connect();
    console.log('database connected');
    const schema = await buildSchema({
      resolvers: [userResolver, TaskResolver],
    });

    const apolloServer = new ApolloServer({
      schema,
      cache: 'bounded',
      introspection: true,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app: app as any, cors: false });
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => { console.log('server running on port 5000') });
  } catch (err) {
    console.error('Error starting servers:', err);
  }
}
startServers();
