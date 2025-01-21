// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/Auth/auth";

export default NextAuth(authOptions);
