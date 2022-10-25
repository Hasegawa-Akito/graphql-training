const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    id: 1,
    title: "オズの魔法使",
    author: "ライマン・フランク・ボーム",
  },
  {
    id: 2,
    title: "風と共に去りぬ",
    author: "マーガレット・ミッチェル",
  },
];

const typeDefs = gql`
  type Query {
    books: [Book!]!
    book(id: Int!): Book
  }

  type Book {
    id: Int!
    title: String!
    author: String!
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (parent: any, args: any, context: any) => {
      const bookId = args.id;
      const book = books.find((book) => book.id === bookId);
      if (!book) return null;
      return book;
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
