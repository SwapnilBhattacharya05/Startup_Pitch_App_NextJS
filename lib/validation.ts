import {z} from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z.string().url().refine(async (url) => {
        try {

            /*
            * NOT FETCHING THE ACTUAL CONTENT => THE IMAGE
            * JUST FETCHING THE HEAD
            * TO GET ACCESS TO IT'S CONTENT TYPE
            */
            const res = await fetch(url, {method: "HEAD"});
            const contentType = res.headers.get("content-type");

            return contentType?.startsWith("image/"); // if STATEMENT SIMPLIFIED
        } catch (e) {
            console.log({"message": e})
            return false
        }
    }),
    pitch: z.string().min(10),
})