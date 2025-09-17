
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      // Ensure we have a GitHub profile
      if (!profile) return false;

      const githubId = String((profile as any).id);
      const name = user.name ?? (profile as any).name ?? null;
      const username = (profile as any).login ?? undefined;
      const email = user.email ?? (profile as any).email ?? undefined;
      const image = user.image ?? (profile as any).avatar_url ?? null;
      const bio = (profile as any).bio ?? null;

      await prisma.author.upsert({
        where: { id: githubId },
        update: { name: name ?? undefined, image: image ?? undefined, bio: bio ?? undefined, email, username },
        create: { id: githubId, name: name ?? "", image: image ?? undefined, bio: bio ?? undefined, email, username },
      });

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = String((profile as any).id);
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
