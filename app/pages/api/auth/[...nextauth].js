import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
// import FacebookProvider from "next-auth/providers/facebook"
// import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
// import TwitterProvider from "next-auth/providers/twitter"
import middleLogger from "../../../lib/mlogger";

const prisma = new PrismaClient();

export const authOptions = {
  session: {
    strategy: 'database',
    maxAge: 60 * 60 * 24, // 24 hours
  },
  adapter: PrismaAdapter(prisma),
  // secret: "1234",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // TwitterProvider({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    // async jwt({ token }) {
    //   token.userRole = "admin"
    //   return token
    // },
    async session(session, token) {
      if (token) {
        session.user = token;
      }
      return Promise.resolve(session);
    },
  },
  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {
    async signIn(message) {
      middleLogger.info(message);
    },
    async signOut(message) {
      middleLogger.info(message);
    },
    async createUser(message) {
      middleLogger.info(message);
    },
    async linkAccount(message) {
      middleLogger.info(message);
    },
    async session(message) {
      middleLogger.info(message);
    },
    async error(message) {
      middleLogger.info(message);
    },
  },
}

export default NextAuth(authOptions)