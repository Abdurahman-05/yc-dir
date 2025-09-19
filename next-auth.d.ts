declare module "next-auth" {
  interface Session {
    id: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id: string;
      username: string | null | undefined;
    };
  }

  interface JWT {
    id: string;
    username?: string | null;
  }
}
