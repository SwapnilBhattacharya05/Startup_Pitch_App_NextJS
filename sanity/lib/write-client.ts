import "server-only"; // SINCE THIS CODE WILL ONLY RUN ON THE SERVER


import {createClient} from "next-sanity";

import {apiVersion, dataset, projectId, token} from "../env";

export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

// FAIL-SAFE CHECK FOR MISSING WRITE TOKEN
if (!writeClient.config().token) {
    throw new Error('Missing write token');
}