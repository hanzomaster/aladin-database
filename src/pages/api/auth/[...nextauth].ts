import { prisma } from "@db/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { env } from "../../../env/server.mjs";
import { CustomsendVerificationRequest } from "./signinemail";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    signIn: async (params) => {
      if (params.user.email) {
        const status = await prisma.user.findUnique({
          where: {
            email: params.user.email,
          },
          select: {
            status: true,
          },
        });
        if (status !== null && status.status === false) {
          return false;
        }
        return true;
      }
    },
  },
  events: {
    createUser: async (message) => {
      await prisma.cart.create({
        data: {
          userId: message.user.id,
        },
      });
      if (message.user.email && env.ADMIN_EMAILS.split(",").includes(message.user.email)) {
        await prisma.user.update({
          where: {
            email: message.user.email,
          },
          data: {
            isAdmin: true,
          },
        });
      }
    },
    linkAccount: async ({ user, profile }) => {
      if (!user.name) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            name: profile.name,
          },
        });
      }
      if (!user.image) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            image: profile.image,
          },
        });
      }
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: env.EMAIL_SERVER,
      from: env.EMAIL_FROM,
      normalizeIdentifier: (identifier) => {
        if (identifier.split("@").length > 2) {
          throw new Error("Only one email allowed");
        }
        return identifier.toLowerCase().trim();
      },
      maxAge: 60 * 60, // 1 hour
      sendVerificationRequest({ identifier, url, provider }) {
        CustomsendVerificationRequest({ identifier, url, provider });
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  session: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/register",
    verifyRequest: "/auth/verify-request",
  },
};

export default NextAuth(authOptions);
