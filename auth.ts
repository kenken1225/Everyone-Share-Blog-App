import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { author_by_auth_id_query } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";
import { log, profile } from "node:console";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user: { name, email, image }, profile, account }) {
      if (!account) return false;
      const id = account.provider === "github" ? profile?.id : profile?.sub;
      if (!id) return false; //IDがない場合はfalseを返す

      const existingUser = await client.withConfig({ useCdn: false }).fetch(author_by_auth_id_query, { id });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          email,
          image,
          username: account?.provider === "github" ? profile?.login : "", // GitHubのみ`login`を使う
          bio: profile?.bio || "",
        });
      }
      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const id = account.provider === "github" ? profile?.id : profile?.sub;
        console.log("ProviderからのID:", id);

        const user = await client.withConfig({ useCdn: false }).fetch(author_by_auth_id_query, { id });
        console.log("Sanityから取得したユーザー:", user);
        token.id = user?._id;
        console.log("JWTコールバック: token.idにセットしたID:", token.id);
      }
      return token;
    },

    async session({ session, token }) {
      session.id = token.id as string;
      return session;
    },
  },
});
