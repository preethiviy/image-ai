import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { db } from "./db/drizzle";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        Github
    ],
})