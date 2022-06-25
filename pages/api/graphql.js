import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import "ts-tiny-invariant"; // importing this module as a workaround for issue described here: https://github.com/vercel/vercel/discussions/5846

const typeDefs = gql`
  type User {
    id: ID
  }

  type Query {
    getUser: User
  }

  type Subject {
    name: String
  }

  type Grade {
    name: String
  }

  type StateStandard {
    name: String
  }

  type Test {
    name: String
    key: Int
  }
  type InstructionalArea {
    name: String
    code: Int
  }
`;

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const apolloServer = new ApolloServer({
  typeDefs,
  schema: neoSchema.schema,
  playground: true,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
