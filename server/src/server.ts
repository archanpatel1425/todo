require("dotenv").config();
import { PrismaClient } from '@prisma/client';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors";
import express, { Application } from "express";
import { DocumentNode, formatError } from "graphql";
import { JwtPayload } from 'jsonwebtoken';
import resolvers from './GraphQL/resolvers/index';
import typeDefs from './GraphQL/typeDefs';

const app: Application = express();
const prisma = new PrismaClient();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static("public"));


const main = async () => {
  type DecodedToken = JwtPayload & { userId: string };

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs as DocumentNode,
    resolvers,
    cache: 'bounded',
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    introspection: true,
    formatError: (error) => {
      if (error.originalError) {
        return {
          message: error.message,
          code: error.extensions.code,
        };
      }
      return formatError(error);
    },
  });
  await prisma.$connect();
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app: app as any,
    cors: false,
    bodyParserConfig: { limit: "1tb" },

  });

  const PORT = process.env.PORT || 5000

  app.listen(PORT, () => { console.log('server running on port 5000') });
};
main().catch((err) => console.error(err));