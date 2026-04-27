import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // Dummy login (no database yet)
        if (
          credentials?.email === "test@gmail.com" &&
          credentials?.password === "1234"
        ) {
          return {
            id: "1",
            name: "Test User",
            email: "test@gmail.com",
          };
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };