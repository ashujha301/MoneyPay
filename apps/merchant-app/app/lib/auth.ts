import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";
import { NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { Account, Profile, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: User | AdapterUser; account: Account | null; profile?: Profile }) {
      console.log("hi signin");
      if (!user || !user.email) {
        return false;
      }

      await db.merchant.upsert({
        select: {
          id: true
        },
        where: {
          email: user.email
        },
        create: {
          email: user.email,
          name: user.name!,
          auth_type: account?.provider === "google" ? "Google" : "Github"
        },
        update: {
          name: user.name!,
          auth_type: account?.provider === "google" ? "Google" : "Github"
        }
      });

      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "secret"
};
