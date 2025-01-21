// src/lib/auth/auth.ts
import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Ensure the environment variables are properly set
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

if (!githubClientId || !githubClientSecret) {
  throw new Error("GitHub Client ID and Secret are required");
}

export const authOptions:AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
    }),
  ],
  session: {
    strategy: "jwt", // Correct type for session strategy
  },
};

export default NextAuth(authOptions);
