import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import * as bodyParser from "body-parser";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
  try {
    const mongoose = await connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@type-todo.gtm0u.mongodb.net`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    await mongoose.connection;
  } catch (err) {
    console.log("mongo connect error", err);
  }

  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  const server = new ApolloServer({ schema });
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  server.applyMiddleware({ app });
  app.listen({ port: process.env.PORT || 5000 }, () => {
    console.log(
      `🚀 Apollo Server listening on http://localhost:${process.env.PORT}${server.graphqlPath}`
    );
  });
};

try {
  main();
} catch (err) {
  console.log("err", err);
}
