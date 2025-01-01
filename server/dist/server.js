"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const apollo_server_express_1 = require("apollo-server-express");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./GraphQL/resolvers/index"));
const typeDefs_1 = __importDefault(require("./GraphQL/typeDefs"));
require("dotenv").config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const apolloServer = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: index_1.default,
    cache: 'bounded',
});
const startServers = async () => {
    try {
        await prisma.$connect();
        console.log('databse connected');
        await apolloServer.start();
        apolloServer.applyMiddleware({ app: app, cors: false });
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => { console.log('server running on port 5000'); });
    }
    catch (err) {
        console.error('Error starting servers:', err);
    }
};
startServers();
