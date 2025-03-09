import {
  GITHUB_CLIENT_ID,
  GITHUB_SECRET_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_KEY,
  MONGO_DB_URI,
} from "@/lib/constants/constants";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectDB from "@/lib/mongodb/connectdb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET_KEY,
    }),
    GitHubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_SECRET_KEY,
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      // Check if user already exists
      const existingUser = await User.findOne({ email: user.email });

      // console.log(existingUser);
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          loginMethod: account.provider,
        });
      } else {
        await User.updateOne(
          { email: existingUser.email },
          {
            $set: {
              image: user.image,
              lastLogin: new Date(),
              loginMethod: account.provider,
            },
          }
        );
      }

      return true;
    },
  },
});
