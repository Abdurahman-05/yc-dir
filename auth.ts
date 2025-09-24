
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

const config = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  callbacks: {
    async signIn({ user, profile }) {
      // Ensure we have a GitHub profile
      if (!profile) return false;

      const githubId = String((profile as any).id);
      const name = user.name ?? (profile as any).name ?? null;
      const email = user.email ?? (profile as any).email ?? undefined;
      const image = user.image ?? (profile as any).avatar_url ?? null;
      const bio = (profile as any).bio ?? null;

      await prisma.author.upsert({
        where: { id: githubId },
        update: { name: name ?? undefined, image: image ?? undefined, bio: bio ?? undefined, email },
        create: { id: githubId, name: name ?? "", image: image ?? undefined, bio: bio ?? undefined, email },
      });

      return true;
    },
    async jwt({ token, account, profile }) {
      // On initial sign in, set provider id and username from provider profile only
      if (account && profile) {
        token.id = String((profile as any).id);
        (token as any).username = (profile as any).login ?? undefined;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      // Expose id and username on the session's user object
      (session.user as any) = {
        ...(session.user || {}),
        id: String(token.id),
        username: (token as any).username ?? null,
      };
      return session;
    },
  },
} as const;

// Cast to any to satisfy TS resolution issues in some setups
export const { handlers, auth, signIn, signOut } = (NextAuth as any)(config);
