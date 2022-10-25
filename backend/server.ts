const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    books: [String]
    amount: Int
  }
`;

const resolvers = {
  Query: {
    books: () => {
      return ["オズの魔法使", "風と共に去りぬ", "a"];
    },
    amount: () => {
      return 3;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000, () => {
  console.log("Start on port 4000.");
});
