import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { expressMiddleware } from '@apollo/server/express4';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import connectDB from './utils/connectDB';
import typeDefs from './gql/typeDefs';
import resolvers from './gql/resolvers';

dotenv.config();

let schema = makeExecutableSchema({ typeDefs, resolvers });

const port = process.env.PORT || 5000;

const startApolloServer = async () => {
  const app: Application = express();

  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions',
  });

  const serverCleanUp = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageLocalDefault(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanUp.dispose();
            },
          };
        },
      },
    ],
  });
  connectDB();
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => await { req },
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(`Server ready at http://localhost:${port}/graphql`);
};

startApolloServer();
