import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./connectDB.js";
import resolvers from "./graphql/resolvers/index.js";
import schema from "./graphql/schemas/index.js"
import refreshToken from "./refreshToken.js";

(async () => {
    try {
        await connectDB();
    } catch (error) {
        console.log(error);
        return;
    }
    const app = express();

    app.use(cors({
        origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
        credentials: true
    }));

    app.use(cookieParser());
    app.get('/', (_, res) => res.send('Server is running'));
    app.use('/refresh_token', refreshToken);

    const apolloServer = new ApolloServer({
        schema,
        rootValue: resolvers,
        context: ({ req, res }) => ({ req, res }),
        plugins: [ApolloServerPluginInlineTrace()],
    });


    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false });

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    })
})();
