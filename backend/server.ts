const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    id: 1,
    title: "オズの魔法使",
    author: "ライマン・フランク・ボーム",
    categoryId: "literature",
    isRead: true,
  },
  {
    id: 2,
    title: "風と共に去りぬ",
    author: "マーガレット・ミッチェル",
    categoryId: "literature",
    isRead: true,
  },
  {
    id: 3,
    title: "人を動かす",
    author: "D・カーネギー",
    categoryId: "self-help",
    isRead: false,
  },
];

const categories = [
  {
    id: "literature",
    name: "文学",
  },
  {
    id: "self-help",
    name: "自己啓発",
  },
];

const typeDefs = gql`
  type Query {
    books(filter: BooksInput): [Book!]!
    book(id: Int!): Book
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Book {
    id: Int!
    title: String!
    author: String!
    category: Category!
  }

  type Category {
    id: ID!
    name: String!
    books: [Book!]!
  }
  input BooksInput {
    isRead: Boolean
  }
`;

const resolvers = {
  Query: {
    books: (
      parent: undefined,
      { filter }: { filter: { isRead: boolean } },
      { books }: any
    ) => {
      let filteredBooks = books;

      if (filter.isRead === true) {
        filteredBooks = filteredBooks.filter((book: any) => {
          return book.isRead;
        });
      }

      return filteredBooks;
    },
    book: (parent: undefined, args: { id: number }, context: {}) => {
      const bookId = args.id;
      const book = books.find((book) => book.id === bookId);
      if (!book) return null;
      return book;
    },
    categories: () => categories,
    category: (parent: undefined, args: { id: string }, context: {}) => {
      const categoryId = args.id;
      const category = categories.find(
        (category) => category.id === categoryId
      );
      if (!category) return null;
      return category;
    },
  },
  Category: {
    books: (parent: { id: string; name: string }, args: {}, context: {}) => {
      const id = parent.id;
      return books.filter((book) => book.categoryId === id); // filterはマッチするもの全て配列で返す。
    },
  },
  Book: {
    category: (parent: { categoryId: string }, args: {}, context: {}) => {
      const categoryId = parent.categoryId;
      console.log(categoryId);
      return categories.find((category) => category.id === categoryId); // findは単体
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    books,
    categories,
  },
});

server.listen(4000, () => {
  console.log("Start on port 4000.");
});
