import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {AUTHOR_BY_GITHUB_ID_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import {writeClient} from "@/sanity/lib/write-client";

export const {handlers, auth, signIn, signOut} = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({
                         user: {name, email, image},
                         profile: {id, login, bio},
                     }) {
            const existingUser = await client
                .withConfig({useCdn: false})
                .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                    id,
                });

            if (!existingUser) {
                await writeClient.create({
                    _type: "author",
                    id: id,
                    name,
                    username: login,
                    email,
                    image,
                    bio: bio || "",
                });
            }

            return true;
        },

        /*
         * ALLOWS TO CONNECT TO A SPECIFIC GITHUB USER WITH A SANITY AUTHOR THAT CAN THEN CREATE THAT STARTUP
         * CREATE AUTHOR ID FROM SANITY TO USE IT IN OUR PROFILE OR WHEN CREATING A NEW STARTUP
         * MODIFYING DEFAULT JWT TOKEN AND ADDING AUTHOR ID TO IT
         */
        async jwt({token, account, profile}) {
            if (account && profile) {
                const user = await client
                    .withConfig({useCdn: false})
                    .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                        id: profile?.id,
                    });
                token.id = user?._id;
            }
            return token;
        },
        async session({session, token}) {
            Object.assign(session, {id: token.id});
            return session;
        },
    },
});