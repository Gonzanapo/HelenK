import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  NextAuthOptions,
  DefaultSession,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties role: UserRole;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    // CredentialsProvider({
    //   name: "Sign In",
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "example@example.com",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //     },
    //     confirmPassword: {
    //       label: "Confirm Password",
    //       type: "password",
    //     },
    //   },
    //   async authorize(
    //     credentials: Record<"email" | "password" | "confirmPassword", string> | undefined
    //   ) {
    //     if (!credentials) {
    //       return null;
    //     }
    //     // Add your logic for verifying the user's credentials here
    //     const user = await prisma.user.findUnique({
    //       where: { email: credentials.email },
    //     });
    
    //     if (user && (await bcrypt.compare(credentials.password, user.password))) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),


    //next-auth providers
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};