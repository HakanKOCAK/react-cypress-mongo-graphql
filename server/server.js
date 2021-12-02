import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
import cors from "cors";

(async () => {
    const app = express();

    app.use(cors());

    app.get("/", (_, res) => res.send("Server is running"));

    const apolloServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String!
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello'
            }
        },
        plugins: [ApolloServerPluginInlineTrace()],
    });


    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    })
})();
